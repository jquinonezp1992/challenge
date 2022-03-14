import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Empleado {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento?: string;
  direccion?: string;
  celular?: string;
  usuario?: string;
  clave?: string;
  rol?: string;
  estadoVacunacion: 'SI' | 'NO';
  vacuna: [Vacuna?];
}

export interface Vacuna {
  id: number;
  dosis: number;
  fecha: string;
  tipo: 'Sputnik' | 'AstraZeneca' | 'Pfizer' | 'Jhonson';
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  cabeceras: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
  }

  listarEmpleados() {
    return this.httpClient.get<Empleado[]>('http://localhost:8080/empleado/consulta', {
      headers: this.cabeceras,
    });
  }

  consultarEmpleado(id: number) {
    return this.httpClient.get<Empleado>('http://localhost:8080/empleado/consultarPorEmpleado/' + id, {
      headers: this.cabeceras,
    });
  }

  actualizarEmpleado(empleado: Empleado) {
    return this.httpClient.put<Empleado>('http://localhost:8080/empleado/editar/empleado', empleado, {
      headers: this.cabeceras,
    });
  }

  eliminarEmpleado(id: number) {
    return this.httpClient.delete<Empleado>('http://localhost:8080/empleado/eliminarEmpleado/' + id, {
      headers: this.cabeceras,
    });
  }

  guardarEmpleado(empleado: Empleado) {
    return this.httpClient.post('http://localhost:8080/empleado/crear/empleado', empleado, {
      headers: this.cabeceras,
    });
  }
}
