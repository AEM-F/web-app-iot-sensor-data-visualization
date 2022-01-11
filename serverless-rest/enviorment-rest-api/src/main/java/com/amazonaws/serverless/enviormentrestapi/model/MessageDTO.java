package com.amazonaws.serverless.enviormentrestapi.model;

public class MessageDTO {
    public static final String errorType = "ERROR";
    private String message;
    private String type;
    private String requestedURI;

    public MessageDTO() {
    }

    public MessageDTO(String message, String type, String requestedURI) {
        this.message = message;
        this.type = type;
        this.requestedURI = requestedURI;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRequestedURI() {
        return requestedURI;
    }

    public void setRequestedURI(String requestedURI) {
        this.requestedURI = requestedURI;
    }
}
