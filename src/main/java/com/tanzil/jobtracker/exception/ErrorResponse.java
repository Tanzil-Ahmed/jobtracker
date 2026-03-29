package com.tanzil.jobtracker.exception;

import java.time.LocalDateTime;

public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private String path;

    // Constructor
    public ErrorResponse(int status, String message, String path) {
        this.timestamp = LocalDateTime.now(); // ✅ FIX HERE
        this.status = status;
        this.message = message;
        this.path = path;
    }

    // Getters
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}