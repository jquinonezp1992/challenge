package com.jquinonez.challenge.unique;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import com.jquinonez.challenge.validator.CedulaValidator;

@Constraint(validatedBy = CedulaValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CedulaUnique {
    String message() default "La cedula ya se encuentra registrada.";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
