package com.tanzil.jobtracker.exception;

// custom exception for job not found
public class JobNotFoundException extends RuntimeException{

    // constructor
    public JobNotFoundException(String message){
        super(message);
    }
}