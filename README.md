<h1 align="center">Intro</h1>
<br>
This project is a cloud solution that uses Nordic Thingy:52 and ESP32 as demo devices to monitor environmental data. 
The ESP32 is going to serve as a BLE to MQQT bridge, exposing the BLE GATT characteristics of the Nordic Thingy:52. 
The bridge device is registered and transmits the data over MQQT to the IoT Hub. 
The following environmental sensors are supported: Temperature, Humidity, Air pressure, Air quality (CO2 and TVOC) 
from the Thingy:52. The weather data from AWS IoT is stored in AWS DynamoDB and extracted using a serverless 
Java backend created using the spring boot as a foundation. The data is visualized in a dashboard created using 
Angular framework as the foundation and D3.js for chart generation. The visualization will contain the values over 
time, feature comparisons, and distribution. After gathering the data and storing it inside DynamoDB, I want to create 
a notebook where I can extract it and apply a machine learning algorithm(TBA).
<br> 
<h1 align="center">Project context</h1>
<br>
For this project, I want to measure the C02 and TVOC values inside an enclosed space like the creative lab or at home. 
At elevated levels, VOCs can cause eye, nose, and throat irritation, headaches, loss of coordination, and damage to 
other organs like the liver and the kidneys.  
Although CO2 is a harmless gas,  long time exposure to the gas will be harmful to health. Around 1000 ppm a human 
will start to experience fatigue and sleepiness. Up to 2000 ppm, a human will start falling asleep and feel tired. 
Naturally, prolonged exposure is very harmful to the body can cause headaches, increased heart rate, dizziness, 
fatigue, rapid breathing, visual and hearing dysfunctions. Exposure to even higher levels will eventually cause 
unconsciousness followed by death. 
I want to prevent these possible health issues by constantly monitoring the values over time. Furthermore, I want to 
discover if other environmental measurements like temperature, humidity, and pressure influence air quality.
<br>
<h1 align="center">Goals</h1>
<br>
The goals I have achieved in this project: 
❖ Deployment and development of an IoT application 
❖ Deployment and development of Java RESTful API for backend 
❖ Visualize data inside a Angular web application 
❖ Learn and use the Chart.js library 