package com.amazonaws.serverless.enviormentrestapi.controller;

import com.amazonaws.serverless.enviormentrestapi.model.MessageDTO;
import com.amazonaws.serverless.enviormentrestapi.model.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public @ResponseBody
    MessageDTO handleResourceNotFound(final ResourceNotFoundException exception, final HttpServletRequest request){
        return new MessageDTO(exception.getMessage(), MessageDTO.errorType, request.getRequestURI());
    }
}
