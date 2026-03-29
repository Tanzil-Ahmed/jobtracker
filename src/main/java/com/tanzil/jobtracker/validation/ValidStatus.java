package com.tanzil.jobtracker.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

// this links annotation with validator
@Constraint(validatedBy = StatusValidator.class)

// this annotation can be used on fields
@Target({ElementType.FIELD})

@Retention(RetentionPolicy.RUNTIME)
public @interface ValidStatus{

    // Default error message
    String message() default "Invalid status value";

    // required by validation framework
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
