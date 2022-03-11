package com.jquinonez.challenge.repository;

import java.util.List;

import com.jquinonez.challenge.entity.VacunaEntity;
import com.jquinonez.challenge.util.TipoVacuna;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VacunaRepository extends JpaRepository<VacunaEntity, Integer> {
    
    List<VacunaEntity> findByEmpleadoId(int empleado);
    List<VacunaEntity> findByTipo(TipoVacuna tipo);
}
