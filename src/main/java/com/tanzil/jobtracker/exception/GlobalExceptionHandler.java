package com.tanzil.jobtracker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
// Applies globally to all controllers
public class GlobalExceptionHandler {

    // 🔥 HANDLE JOB NOT FOUND (CUSTOM EXCEPTION)
    @ExceptionHandler(JobNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleJobNotFoundException(
            JobNotFoundException ex,
            HttpServletRequest request
    ) {
        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),  // 404
                ex.getMessage(),               // error message
                request.getRequestURI()        // API path
        );
    }

    // 🔥 HANDLE VALIDATION ERRORS
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {

        Map<String, String> fieldErrors = new HashMap<>();

        // Extract field-wise errors
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        });

        // Final structured response
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", java.time.LocalDateTime.now());
        response.put("status", 400);
        response.put("errors", fieldErrors);
        response.put("path", request.getRequestURI());

        return response;
    }
}