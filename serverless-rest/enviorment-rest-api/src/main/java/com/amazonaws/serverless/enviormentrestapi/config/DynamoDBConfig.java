package com.amazonaws.serverless.enviormentrestapi.config;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.serverless.enviormentrestapi.model.SensorValue;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.*;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashMap;

@Configuration
@EnableDynamoDBRepositories
        (basePackages = "com.amazonaws.serverless.enviormentrestapi.repository")
public class DynamoDBConfig {
    @Value("${amazon.dynamodb.endpoint}")
    private String amazonDynamoDBEndpoint;
    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;
    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;
    @Bean
    public AmazonDynamoDB amazonDynamoDB(AWSCredentialsProvider awsCredentialsProvider) {
        AmazonDynamoDB amazonDynamoDB
                = AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(amazonDynamoDBEndpoint, "eu-central-1"))
                .withCredentials(awsCredentialsProvider).build();
        // use only once to create the table
        //CreateEnvironmentTable(amazonDynamoDB);
        return amazonDynamoDB;
    }
    @Bean
    public AWSCredentialsProvider awsCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials(amazonAWSAccessKey, amazonAWSSecretKey));
    }

    public void CreateEnvironmentTable(AmazonDynamoDB amazonDynamoDB){
        String tableName = "environment_table";

        try {
            System.out.println("Attempting to create table; please wait...");
            CreateTableResult table = amazonDynamoDB.createTable(
                    Arrays.asList(new AttributeDefinition("sample_time", ScalarAttributeType.S)),
                    tableName,
                    Arrays.asList(new KeySchemaElement("sample_time", KeyType.HASH)),
                    new ProvisionedThroughput(5L, 5L));
            System.out.println("Success.  Table status: " + table.getTableDescription().getTableStatus());

        }
        catch (Exception e) {
            System.err.println("Unable to create table: ");
            System.err.println(e.getMessage());
        }
    }
}
