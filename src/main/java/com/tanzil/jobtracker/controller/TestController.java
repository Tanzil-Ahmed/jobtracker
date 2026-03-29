package com.tanzil.jobtracker.controller;

//import annotation to mark this class as REST controller
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//This tells Spring : "This class will handle HTTP request"
@RestController
public class TestController{

    // This map HTTP GET request to "/" URL
    @GetMapping("/")
    public String home(){

        // This is the response sent back to browser
        return "backend is running";
    }
    // Another endpoint
    @GetMapping("/hello")
    public String hello() {
        return "Hello Tanzil 👋";
    }
}