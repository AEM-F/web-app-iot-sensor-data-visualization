package com.amazonaws.serverless.enviormentrestapi.repository;

import com.amazonaws.serverless.enviormentrestapi.model.SensorValue;
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBPagingAndSortingRepository;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;

@EnableScan
public interface SensorValueRepository extends DynamoDBPagingAndSortingRepository<SensorValue, String> {

}
