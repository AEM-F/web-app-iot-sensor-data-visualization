package com.amazonaws.serverless.enviormentrestapi.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.Map;

@DynamoDBTable(tableName = "environment_table")
public class SensorValue {

    private String sample_time;
    private Map<String, Float> device_data;

    public SensorValue() {
    }

    public SensorValue(String sample_time, Map<String, Float> device_data) {
        this.sample_time = sample_time;
        this.device_data = device_data;
    }

    @DynamoDBHashKey
    public String getSample_time() {
        return sample_time;
    }

    public void setSample_time(String sample_time) {
        this.sample_time = sample_time;
    }

    @DynamoDBAttribute
    public Map<String, Float> getDevice_data() {
        return device_data;
    }

    public void setDevice_data(Map<String, Float> device_data) {
        this.device_data = device_data;
    }

    @Override
    public String toString() {
        return "SensorValue{" +
                "sample_time='" + sample_time + '\'' +
                ", device_data='" + device_data + '\'' +
                '}';
    }
}
