package com.amazonaws.serverless.enviormentrestapi.controller;

import com.amazonaws.serverless.enviormentrestapi.model.ResourceNotFoundException;
import com.amazonaws.serverless.enviormentrestapi.service.SensorValueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/sensor_values")
@CrossOrigin(origins = "*")
public class SensorValueController {
    private SensorValueService sensorValueService;

    public SensorValueController(SensorValueService sensorValueService) {
        this.sensorValueService = sensorValueService;
    }

    @GetMapping()
    public ResponseEntity<Object> GetAllSensorValues() throws ResourceNotFoundException {
        return ResponseEntity.ok(sensorValueService.GetAllSensorValues());
    }

    @GetMapping(path = "/{sample_time}")
    public ResponseEntity<Object> GetSensorValueBySampleTime(@PathVariable(name = "sample_time") Integer sample_time) throws ResourceNotFoundException {
        String sample_time_string = sample_time.toString();
        return ResponseEntity.ok(sensorValueService.GetSensorValueBySampleTime(sample_time_string));
    }
}
