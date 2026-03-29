package com.tanzil.jobtracker.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

// <Annotation, Datatype>
public class StatusValidator implements ConstraintValidator<ValidStatus, String>{

    // allowed values
    private static final List<String> VALID_STATUS = List.of("Applied","Interview","Offer","Rejected");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context){

        // Let @NotBlank ahndle null
        if(value == null){
            return true;
        }

        // check if value is in allowed list
        return VALID_STATUS.contains(value);
    }
}