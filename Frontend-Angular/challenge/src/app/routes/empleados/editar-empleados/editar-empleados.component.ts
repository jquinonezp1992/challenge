import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado, EmpleadosService } from '@shared/services/empleados.service';
import { IdentificacionValidator } from '@shared/validator/validatorControls';

@Component({
  selector: 'app-editar-empleados',
  templateUrl: './editar-empleados.component.html',
  styleUrls: ['./editar-empleados.component.css']
})
export class EditarEmpleadosComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadosComponent>,
    private formBuilder: FormBuilder,
    private servicioEmpleado: EmpleadosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      id: '',
      cedula: new FormControl('', [Validators.required, IdentificacionValidator]),
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('EMPLEADO', [Validators.required]),
      fechaNacimiento: [''],
      direccion: [''],
      celular: [''],
      estadoVacunacion: ['NO'],
      usuario: '',
      clave: '',
      vacuna: [],
    });
  }

  ngOnInit(): void {
    if (this.data.record) {
      this.servicioEmpleado.consultarEmpleado(this.data.record.id).subscribe((x: Empleado) => {
        this.form.setValue(x);
      });
    }
  }

  GuardarEmpleado = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const empleado: Empleado = {
      ...this.form.value,
    };

    if (this.data.record) {
      this.servicioEmpleado.actualizarEmpleado(empleado).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.servicioEmpleado.guardarEmpleado(empleado).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  };

}
