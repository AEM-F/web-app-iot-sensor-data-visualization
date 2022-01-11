package com.amazonaws.serverless.enviormentrestapi;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.serverless.enviormentrestapi.model.SensorValue;
import com.amazonaws.serverless.enviormentrestapi.repository.SensorValueRepository;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.HashMap;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class EnviormentRestApiApplication {
    private AmazonDynamoDB amazonDynamoDB;

    @Autowired
    public void setAmazonDynamoDB(AmazonDynamoDB amazonDynamoDB) {
        this.amazonDynamoDB = amazonDynamoDB;
    }

    public static void main(String[] args) {
        SpringApplication.run(EnviormentRestApiApplication.class, args);
    }
//    @EventListener(ApplicationReadyEvent.class)
//    public void SaveTestItemsAfterStartUp() {
//        System.out.println("Started item adding process");
//        SensorValue item1 = new SensorValue();
//        item1.setSample_time("1640549783379");
//        HashMap<String, Float> sensorValues = new HashMap<>();
//        sensorValues.put("temperature", 21.78F);
//        sensorValues.put("tvoc", 8F);
//        sensorValues.put("humidity", 100F);
//        sensorValues.put("pressure", 226300.4F);
//        sensorValues.put("c02", 455F);
//        item1.setDevice_data(sensorValues);
//        System.out.println("Created item1: "+item1.toString());
//
//        SensorValue item2 = new SensorValue();
//        item2.setSample_time("1640548918579");
//        HashMap<String, Float> sensorValues2 = new HashMap<>();
//        sensorValues2.put("temperature", 8.89F);
//        sensorValues2.put("tvoc", 20F);
//        sensorValues2.put("humidity", 77F);
//        sensorValues2.put("pressure", 226300.3F);
//        sensorValues2.put("c02", 536F);
//        item2.setDevice_data(sensorValues2);
//        System.out.println("Created item2: "+item2.toString());
//
//        SensorValue item3 = new SensorValue();
//        item3.setSample_time("1640550364678");
//        HashMap<String, Float> sensorValues3 = new HashMap<>();
//        sensorValues3.put("temperature", 20.51F);
//        sensorValues3.put("tvoc", 1F);
//        sensorValues3.put("humidity", 100F);
//        sensorValues3.put("pressure", 226300.6F);
//        sensorValues3.put("c02", 409F);
//        item3.setDevice_data(sensorValues3);
//        System.out.println("Created item3: "+item3.toString());
//        try {
//            DynamoDBMapper mapper = new DynamoDBMapper(amazonDynamoDB);
//            System.out.println("Saving item1...");
//            mapper.save(item1);
//            System.out.println("Saving item3...");
//            mapper.save(item2);
//            System.out.println("Saving item3...");
//            mapper.save(item3);
//            System.out.println("Successfully saved all three items! :)");
//        } catch (Exception e) {
//            System.err.println(e.getMessage());
//            System.exit(1);
//        }
//    }
}
