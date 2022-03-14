package com.jquinonez.challenge.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.jquinonez.challenge.entity.EmpleadoEntity;
import com.jquinonez.challenge.repository.EmpleadoRepository;
import com.jquinonez.challenge.util.EstadoVacunacion;
import com.jquinonez.challenge.util.Metodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
@RequestMapping("/empleado")
public class EmpleadoController {
    
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping("/consulta")
    public ResponseEntity<List<EmpleadoEntity>> consultaEmpleados() {

        List<EmpleadoEntity> listaEmpleado = empleadoRepository.findAll();

        if (listaEmpleado.size() == 0) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(listaEmpleado);
    }

    @RequestMapping(value = "/consultarPorEmpleado/{id}")
    public ResponseEntity<EmpleadoEntity> getEmpleado(@PathVariable("id") int id) {

        Optional<EmpleadoEntity> optionalEmpleado = empleadoRepository.findById(id);

        if (optionalEmpleado.isPresent()) {
            return ResponseEntity.ok(optionalEmpleado.get());
        }

        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/crear/empleado")
    public ResponseEntity<EmpleadoEntity> crearEmpleado(@Valid @RequestBody EmpleadoEntity empleado) {
        Metodo metodo = new Metodo();
        String usuario = metodo.generateUsername(empleado);
        String clave = metodo.generateRandomPassword(10);
        EmpleadoEntity nuevoEmpleado = new EmpleadoEntity();
        nuevoEmpleado.setCedula(empleado.getCedula());
        nuevoEmpleado.setNombre(empleado.getNombre());
        nuevoEmpleado.setApellido(empleado.getApellido());
        nuevoEmpleado.setCorreo(empleado.getCorreo());
        nuevoEmpleado.setUsuario(usuario);
        nuevoEmpleado.setClave(clave);
        nuevoEmpleado.setRol(empleado.getRol());
        nuevoEmpleado.setFechaNacimiento(empleado.getFechaNacimiento());
        nuevoEmpleado.setDireccion(empleado.getDireccion());
        nuevoEmpleado.setCelular(empleado.getCelular());
        nuevoEmpleado.setEstadoVacunacion(empleado.getEstadoVacunacion());
        empleadoRepository.save(nuevoEmpleado);
        return ResponseEntity.ok(nuevoEmpleado);
    }

    @DeleteMapping(value = "/eliminarEmpleado/{id}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable("id") int id) {
        empleadoRepository.deleteById(id);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/editar/empleado")
    public ResponseEntity<EmpleadoEntity>editarEmpleado(@RequestBody EmpleadoEntity empleado) {

        Optional<EmpleadoEntity> optionalEmpleado = empleadoRepository.findById(empleado.getId());

        if (optionalEmpleado.isPresent()) {

            EmpleadoEntity updateEmpleado = optionalEmpleado.get();

            updateEmpleado.setNombre(empleado.getNombre());
            updateEmpleado.setApellido(empleado.getApellido());
            updateEmpleado.setCorreo(empleado.getCorreo());
            updateEmpleado.setCedula(empleado.getCedula());
            updateEmpleado.setDireccion(empleado.getDireccion());
            updateEmpleado.setFechaNacimiento(empleado.getFechaNacimiento());
            updateEmpleado.setEstadoVacunacion(empleado.getEstadoVacunacion());
            updateEmpleado.setCelular(empleado.getCelular());
            updateEmpleado.setRol(empleado.getRol()); 

            EmpleadoEntity saveEmpleado = empleadoRepository.save(updateEmpleado);

            return ResponseEntity.ok(saveEmpleado);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/consultaEmpleadoPorEstadoVacunacion/{estadoVacunacion}")
    public ResponseEntity<List<EmpleadoEntity>> consultaEmpleadoPorEstadoVacunacion(@PathVariable("estadoVacunacion") EstadoVacunacion estadoVacunacion) {
        
        List<EmpleadoEntity> listaEmpleado = empleadoRepository.findByEstadoVacunacion(estadoVacunacion);
        
        if (listaEmpleado.size() == 0) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(listaEmpleado);
    }

    
}
