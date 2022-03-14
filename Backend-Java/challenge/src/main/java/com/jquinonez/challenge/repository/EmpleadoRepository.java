package com.jquinonez.challenge.repository;

import java.util.List;

import com.jquinonez.challenge.entity.EmpleadoEntity;
import com.jquinonez.challenge.util.EstadoVacunacion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<EmpleadoEntity, Integer> {
    EmpleadoEntity findByCedula(String cedula);
    List<EmpleadoEntity> findByEstadoVacunacion(EstadoVacunacion estadoVacunacion);
}
