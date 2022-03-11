package com.jquinonez.challenge.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.jquinonez.challenge.repository.EmpleadoRepository;
import com.jquinonez.challenge.unique.CedulaUnique;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CedulaValidator implements ConstraintValidator<CedulaUnique, String> {

    @Autowired EmpleadoRepository empleadoRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return empleadoRepository.findByCedula(email) == null;
    }
    
}
