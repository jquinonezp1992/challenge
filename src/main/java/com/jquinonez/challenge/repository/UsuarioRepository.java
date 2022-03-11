package com.jquinonez.challenge.repository;

import com.jquinonez.challenge.entity.EmpleadoEntity;
import com.jquinonez.challenge.entity.UsuarioEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    EmpleadoEntity findByUsuario(int usuario);
}
