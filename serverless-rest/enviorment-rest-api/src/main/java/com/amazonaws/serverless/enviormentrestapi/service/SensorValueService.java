package com.amazonaws.serverless.enviormentrestapi.service;

import com.amazonaws.serverless.enviormentrestapi.model.ResourceNotFoundException;
import com.amazonaws.serverless.enviormentrestapi.model.SensorValue;
import com.amazonaws.serverless.enviormentrestapi.repository.SensorValueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SensorValueService {
    private SensorValueRepository sensorValueRepository;
    private Logger log = LoggerFactory.getLogger(SensorValueService.class);

    public SensorValueService(SensorValueRepository sensorValueRepository) {
        this.sensorValueRepository = sensorValueRepository;
    }

    public List<SensorValue> GetAllSensorValues() throws ResourceNotFoundException {
        log.info("Getting the sensor values...");
        List<SensorValue> sensorValues = new ArrayList<>();
        sensorValues = StreamSupport
                .stream(sensorValueRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        if(sensorValues.isEmpty()){
            log.error("No sensor values were found");
            throw new ResourceNotFoundException("The are no sensor values");
        }else{
            log.info("Received sensor values:");
            log.info(sensorValues.toString());
            return sensorValues;
        }
    }

    public SensorValue GetSensorValueBySampleTime(String sample_time) throws ResourceNotFoundException {
        log.info("Getting sensor value under given sample_time("+sample_time+")...");
        Optional<SensorValue> sensorValue = sensorValueRepository.findById(sample_time);
        if (sensorValue.isPresent()) {
            log.info("Found: "+ sensorValue.get().toString());
            return sensorValue.get();
        }
        log.error("Cant find any value under given sample time");
        throw new ResourceNotFoundException("Cant find any value under given sample time");
    }
}
