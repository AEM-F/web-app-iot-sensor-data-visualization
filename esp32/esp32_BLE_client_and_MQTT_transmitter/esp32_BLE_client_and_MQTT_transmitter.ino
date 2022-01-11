
#include "BLEDevice.h"
#include <AWS_IOT.h>
#include <WiFi.h>
#include "ArduinoJson.h"
//#include "time.h"

#define BUF_LEN 256

static int restart_interval = 60000; // reset interval in ms

//**********************************************
// Time gloabal variables (no longer needed due to DynamoDB timestamp functionality)
//const char* ntpServer = "pool.ntp.org";
//const long  gmtOffset_sec = 3600;
//const int   daylightOffset_sec = 3600;

//**********************************************
// AWS and WIFI configurations
AWS_IOT hornbill;

//char WIFI_SSID[] = "Ziggo8330506";
//char WIFI_PASSWORD[] = "jrkrmwNG48jx";
char WIFI_SSID[] = "a2";
char WIFI_PASSWORD[] = "cristino";
char HOST_ADDRESS[] = "a3njlawi6vvbuj-ats.iot.eu-central-1.amazonaws.com";
char CLIENT_ID[] = "esp32_bridge_thingy52";
char TOPIC_NAME[] = "esp32_bridge_thingy52/env-service";


int status = WL_IDLE_STATUS;

//**********************************************
// Service and characteristics UUIDs

//Thingy MAC address
static BLEAddress thingyAddress("F3:EF:D6:0F:07:D1");

// The enviromental service
static BLEUUID serviceUUID("ef680200-9b35-4933-9b10-52ffa9740042");
// The temperature characteristic
static BLEUUID charUUIDTemp("ef680201-9b35-4933-9b10-52ffa9740042");
// The pressure characteristic
static BLEUUID charUUIDPress("ef680202-9b35-4933-9b10-52ffa9740042");
// The humidity characteristic
static BLEUUID charUUIDHum("ef680203-9b35-4933-9b10-52ffa9740042");
// The air quality characteristic
static BLEUUID charUUIDAirQ("ef680204-9b35-4933-9b10-52ffa9740042");

#define NO_OF_CHARACTERISTICS 4
static BLEUUID myCharacteristics[NO_OF_CHARACTERISTICS] = {charUUIDTemp, charUUIDPress, charUUIDHum, charUUIDAirQ};

static volatile boolean connected = false;

static BLEClient*  pClient;
bool bleDeviceConnected = false;
//**********************************************
//Thingy variables for received values
float temperature;
int humidity;
float pressure;
uint16_t c02;
uint16_t tvoc;


bool receivedTemp = false;
bool receivedHum = false;
bool receivedPress = false;
bool receivedC02 = false;
bool receivedTvoc = false;

bool checkIfValuesAreReceived() {
  if (receivedTemp && receivedHum && receivedPress && receivedC02 && receivedTvoc) {
    return true;
  }
  else {
    return false;
  }
}

void resetValues() {
  receivedTemp = false;
  receivedHum = false;
  receivedPress = false;
  receivedC02 = false;
  receivedTvoc = false;

  temperature = 0.0;
  humidity = 0;
  pressure = 0.0;
  c02 = 0;
  tvoc = 0;
}

//**********************************************
//Characteristics data conversions

uint16_t get_16bitsection_le(uint8_t *start, int index) {
  uint16_t *p = (uint16_t*) start;

  return p[index];
}

//**********************************************
//Notification callback
static void notifyCallback(
  BLERemoteCharacteristic* pBLERemoteCharacteristic,
  uint8_t* pData,
  size_t length,
  bool isNotify) {
  if (checkIfValuesAreReceived() == true) {
    pClient->disconnect();
    bleDeviceConnected = false;
  }
  Serial.println(">>>> notifyCallback ");
  Serial.println(pBLERemoteCharacteristic->getUUID().toString().c_str());
  if ( pBLERemoteCharacteristic->getUUID().equals(charUUIDTemp)) {
    Serial.print("Temp data: ");
    char strTemp[25] = "";
    sprintf(strTemp, "%d.%d", pData[0], pData[1]);
    temperature = atof(strTemp);
    Serial.println(temperature);
    receivedTemp = true;
  } else if ( pBLERemoteCharacteristic->getUUID().equals(charUUIDHum)) {
    Serial.print("Hum data: ");
    char strHum[25] = "";
    sprintf(strHum, "%d", pData[0]);
    humidity = atoi(strHum);
    Serial.println(humidity);
    receivedHum = true;
  } else if ( pBLERemoteCharacteristic->getUUID().equals(charUUIDPress)) {
    Serial.print("Pressure data: ");
    char strPress[25] = "";
    sprintf(strPress, "%d%d%d%d.%d", pData[0], pData[1], pData[2], pData[3], pData[4]);
    pressure = atof(strPress);
    Serial.println(pressure);
    receivedPress = true;
  } else if ( pBLERemoteCharacteristic->getUUID().equals(charUUIDAirQ)) {
    delay(3000); // delay 2 seconds so the gas sensor can compute the values
    Serial.print("C02 data: ");
    c02 = get_16bitsection_le(pData, 0);
    Serial.println(c02);
    Serial.print("TVOC data: ");
    tvoc = get_16bitsection_le(pData, 1);
    Serial.println(tvoc);
    receivedTvoc = true;
    receivedC02 = true;

  } else {
    Serial.println("----Not recognized UUID");
  }
  Serial.println("<<<< notifyCallback");
}

//**********************************************
//Client connection callback
class MyClientCallback : public BLEClientCallbacks {
    void onConnect(BLEClient* pclient) {
    }

    void onDisconnect(BLEClient* pclient) {
      connected = false;
      Serial.println("On disconnect");
    }
};

//**********************************************
//Connect to a characteristics
bool connectToCharacteristics(BLERemoteService* pRemoteService, BLEUUID uuid) {
  BLERemoteCharacteristic* pRemoteCharacteristic = pRemoteService->getCharacteristic(uuid);
  if (pRemoteCharacteristic == nullptr) {
    Serial.print("--->Failed to find our characteristic UUID: ");
    Serial.println(uuid.toString().c_str());
    return false;
  }
  Serial.println(" - Found");
  if (pRemoteCharacteristic->canNotify()) {
    Serial.print("--->Registering for notifications...");
    pRemoteCharacteristic->registerForNotify(notifyCallback);
    Serial.println("...done");
    return true;
  }
  return false;
}

//**********************************************
//Connect to a remote BLE device
bool connectToServer(BLEClient*  pClient) {
  Serial.println("Connecting to thingy...");
  if ( pClient->connect( thingyAddress, BLE_ADDR_TYPE_RANDOM ) ) {
    Serial.print(" - Connected");
  } else {
    Serial.print(" - ERROR");
    return false;
  }

  Serial.print("Connecting to service...");
  BLERemoteService* pRemoteService = pClient->getService(serviceUUID);
  if (pRemoteService == nullptr) {
    Serial.print("Failed to find our service UUID: ");
    Serial.println(serviceUUID.toString().c_str());
    pClient->disconnect();
    return false;
  }
  Serial.println(" - found");

  Serial.print("Connecting to characteristics...");
  for (int i = 0; i < NO_OF_CHARACTERISTICS; i++) {
    Serial.print("Connecting to characteristics ");
    Serial.print(i + 1);
    Serial.print(" (of ");
    Serial.print(NO_OF_CHARACTERISTICS);
    Serial.print("), uuid: ");
    Serial.println(myCharacteristics[i].toString().c_str());
    if ( !connectToCharacteristics(
           pRemoteService,
           myCharacteristics[i]
         )) {
      return false;
    }
  }
  return true;
}

//**********************************************
//Init BLE device
void initBleDevice() {
  Serial.println("Starting Arduino BLE Client application...");
  BLEDevice::init("");
  if (pClient != nullptr)
    delete(pClient);
  pClient = BLEDevice::createClient();
  pClient->setClientCallbacks(new MyClientCallback());

  // Connect to the remove BLE Server.
  if ( !(connected = connectToServer(pClient))) {
    pClient->disconnect();
  }
  bleDeviceConnected = true;
}

//**********************************************
//Connect to WIFI and AWS server
void connectToAWS() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wifi connecting...");
    delay(500);
  }
  Serial.println("Wifi connected");

  //init and get the time
  //  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  delay(500);
  //struct tm timeinfo;
  //if (!getLocalTime(&timeinfo)) {
  //  Serial.println("Failed to obtain dataTime");
  // }
  // char timeStringBuff[50]; //50 chars should be enough
  // char timeStringBuff2[50]; //50 chars should be enough
  // strftime(timeStringBuff, sizeof(timeStringBuff), "%Y-%m-%d", &timeinfo);
  // strftime(timeStringBuff2, sizeof(timeStringBuff), "%H:%M:%S", &timeinfo);
  //delay(500);

  if (hornbill.connect(HOST_ADDRESS, CLIENT_ID) == 0)
  {
    Serial.println("Connected to AWS");
    delay(1000);
    char buffer[BUF_LEN];
    StaticJsonDocument<BUF_LEN> doc;
    delay(1000);
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    doc["pressure"] = pressure;
    doc["c02"] = c02;
    doc["tvoc"] = tvoc;
    //  doc["date"] = timeStringBuff;
    //  doc["time"] = timeStringBuff2;
    serializeJson(doc, buffer);
    delay(1000);
    if (hornbill.publish(TOPIC_NAME, buffer) == 0)
    {
      Serial.print("Publish Message:");
      Serial.println(buffer);
    }
    else
    {
      Serial.println("Publish failed");
    }

  }
  else
  {
    Serial.println("AWS connection failed, Check the HOST Address");
    while (1);
  }

  delay(2000);
}

//**********************************************
//Disconnect from WIFI and AWS server
void disconnectFromAWS() {
  delay(500);
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Wifi disconnecting...");
    delay(500);
    WiFi.disconnect();
    delay(500);
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("Wifi succesfully disconnected");
    } else {
      Serial.println("Wifi failed to disconnect");
    }
  }
}

//**********************************************
//Setup
void setup() {
  Serial.begin(115200);
  initBleDevice();

}

//**********************************************
//Loop
void loop() {
  static int disconnectCounter = 0;
  if ( !connected ) {
    // ble disconnected
    BLEDevice::deinit(true);
    if (pClient != nullptr) {
      delete(pClient);
    }
    Serial.println("---->DISCONNECTED FROM BLE");
    connectToAWS();
    delay(1000);
    disconnectFromAWS();
    Serial.println("---->RESTARTING ESP32");
    delay(restart_interval);
    ESP.restart();
    disconnectCounter += 1;
  } else {
    // ble connected
    disconnectCounter = 0;
  }

  // if ( disconnectCounter > 20) {
  //  connected = connectToServer(pClient);
  // disconnectCounter = 0;
  //}
  delay(10);

}
