package com.jquinonez.challenge.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.jquinonez.challenge.entity.EmpleadoEntity;
import com.jquinonez.challenge.entity.VacunaEntity;
import com.jquinonez.challenge.repository.EmpleadoRepository;
import com.jquinonez.challenge.repository.VacunaRepository;
import com.jquinonez.challenge.util.TipoVacuna;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/vacuna")
public class VacunaController {
    
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private VacunaRepository vacunaRepository;

    @GetMapping("/empleado/vacuna/consultar/{empleadoId}/")
    public ResponseEntity<List<VacunaEntity>> consultarVacuna(@PathVariable("empleadoId") int empleadoId) {

        List<VacunaEntity> listaVacuna = vacunaRepository.findByEmpleadoId(empleadoId);

        if (listaVacuna.size() == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(listaVacuna);
    }

    @PostMapping("/empleado/vacuna/crear/{empleadoId}/")
    public ResponseEntity<VacunaEntity> crearVacuna(@Valid @PathVariable("empleadoId") int empleadoId,
            @RequestBody VacunaEntity vacuna) {

        Optional<EmpleadoEntity> optionalEmpleado = empleadoRepository.findById(empleadoId);

        if (!optionalEmpleado.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        vacuna.setEmpleado(optionalEmpleado.get());
        VacunaEntity newDosis = vacunaRepository.save(vacuna);
        return ResponseEntity.ok(newDosis);

    }

    @DeleteMapping("/empleado/vacuna/{empleadoId}/{id}")
    public ResponseEntity<Void> eliminarVacuna(@PathVariable("empleadoId") int empleadoId, @PathVariable("id") int id) {

        Optional<EmpleadoEntity> optionalEmpleado = empleadoRepository.findById(empleadoId);

        if (!optionalEmpleado.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        vacunaRepository.deleteById(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/consultaPorTipoVacuna/{tipoVacuna}")
    public ResponseEntity<Object> consultaPorTipoVacuna(@PathVariable("tipoVacuna") TipoVacuna tipoVacuna) {
        
        List<VacunaEntity> listaVacuna = vacunaRepository.findByTipo(tipoVacuna);
        
        if (listaVacuna.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(listaVacuna);
    }
}
