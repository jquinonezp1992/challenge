import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Empleado, EmpleadosService } from '@shared/services/empleados.service';
import { ListarVacunasComponent } from 'app/routes/vacunas/listar-vacunas/listar-vacunas.component';
import { EditarEmpleadosComponent } from '../editar-empleados/editar-empleados.component';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {

  form: FormGroup;

  cargando = true;
  mostrarPaginacion = true;
  listaEmpleados: any[] = [];
  listadoEstados: any[] = [
    {
      value: 'NO',
      name: 'No Vacunado'
    },
    {
      value: 'SI',
      name: 'Vacunado'
    }
  ];
  listadoVacunas: any[] = [
    {
      value: 'T',
      name: 'Todas'
    },
    {
      value: 'Sputnik',
      name: 'Sputnik'
    },
    {
      value: 'AstraZeneca',
      name: 'AstraZeneca'
    },
    {
      value: 'Pfizer',
      name: 'Pfizer'
    },
    {
      value: 'Jhonson',
      name: 'Jhonson'
    }
  ];
  columns: MtxGridColumn[] = [
    {
      header: 'Cedula',
      field: 'cedula',
      minWidth: 100,
    },
    {
      header: 'Nombre',
      field: 'nombre',
      minWidth: 100,
    },
    {
      header: 'Apellido',
      field: 'apellido',
      minWidth: 100,
    },
    {
      header: 'Correo',
      field: 'correo',
      minWidth: 100,
    },
    {
      header: 'Fecha Nacimiento',
      field: 'fechaNacimiento',
      minWidth: 100,
    },
    {
      header: 'Dirección',
      field: 'direccion',
      minWidth: 120,
    },
    {
      header: 'Celular',
      field: 'celular',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'Estado Vacunacion',
      field: 'estadoVacunacion',
      minWidth: 180,
    },
    {
      header: 'Operaciones',
      field: 'operacion',
      minWidth: 120,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Editar',
          click: record => this.EditarEmpleado(record),
        },
        {
          type: 'icon',
          icon: 'local_hospital',
          tooltip: 'Datos vacunacion',
          click: record => this.ListarVacunas(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'Eliminar',
          tooltip: 'Eliminar',
          pop: true,
          popTitle: '¿Desea eliminar?',
          popCloseText: 'Cerrar',
          popOkText: 'Ok',
          click: record => this.EliminarEmpleado(record),
        },
      ],
    },
  ];

  constructor(
    private servicioEmpleados: EmpleadosService,
    public dialog: MtxDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    //public vacunesService: VacunesService
  ) {
    this.form = this.formBuilder.group({
      estado: [],
      tipoVacuna: [],
      fechaDesde: [],
      fechaHasta: [],
    });
  }

  ngOnInit(): void {
    this.form.get('fechaDesde')?.setValue(new Date());
    this.form.get('fechaHasta')?.setValue(new Date());
    this.form.get('estado')?.setValue('SI');
    this.form.get('tipoVacuna')?.setValue('T');
    this.ListarEmpleados();
  }

  ListarEmpleados = () => {
    this.servicioEmpleados.listarEmpleados().subscribe((result: Empleado[]) => {
      this.listaEmpleados = result;
      this.cargando = false;
    });
  };

  NuevoEmpleado = () => {
    const dialogRef = this.dialog.originalOpen(EditarEmpleadosComponent, {
      width: '600px',
      data: { record: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  };

  EditarEmpleado = (value: any) =>  {
    const dialogRef = this.dialog.originalOpen(EditarEmpleadosComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  };

  EliminarEmpleado = (value: any) => {
    this.servicioEmpleados.eliminarEmpleado(value.id).subscribe(() => {
      this.dialog.alert(`Registro eliminado`);
      this.ngOnInit();
    });
  };

  ListarVacunas = (value: any) => {
    if (value.VacunationData.length > 0) {
      this.dialog.originalOpen(ListarVacunasComponent, {
        width: '600px',
        data: { records: value.VacunationData },
      });
    } else {
      this.snackBar.open('No posee registros de vacunación', 'Cerrar', { duration: 5000 });
    }
  };

  Limpiar = () => {
    this.ngOnInit();
  };

  Consultar = () => {
    this.cargando = true;

    /*this.servicioEmpleados.getEmployees().subscribe((result: Employee[]) => {
      this.listaEmpleados = result.filter(
        (x: Employee) => x.vacunationState === this.form.get('vacunationState')?.value
      );

      if (this.form.get('vacunationState')?.value === 'N') {
        this.listaEmpleados = this.listaEmpleados.map((x: Employee) => {
          return { ...x, vacunationState: this.vacunationStates[x.vacunationState] };
        });
        this.cargando = false;
        return;
      } else {
        if (this.form.get('vacuneType')?.value !== 'T') {
          this.listaEmpleados = this.listaEmpleados.filter((x: any) => {
            return x.VacunationData.find(
              (elementTypeVacune: any) =>
                elementTypeVacune.vacuneType === this.form.get('vacuneType')?.value
            );
          });
        }

        this.listaEmpleados = this.listaEmpleados.filter((x: any) => {
          return x.VacunationData.find((elementDateVacune: any) => {
            const vacuneDate = new Date(elementDateVacune.vacuneDate).getTime();
            const dateStart = this.form.get('dateFrom')?.value._isAMomentObject
              ? this.form.get('dateFrom')?.value.toDate().getTime()
              : this.form.get('dateFrom')?.value.getTime();
            const dateEnd = this.form.get('dateTo')?.value._isAMomentObject
              ? this.form.get('dateTo')?.value.toDate().getTime()
              : this.form.get('dateTo')?.value.getTime();
            return vacuneDate >= dateStart && vacuneDate <= dateEnd;
          });
        });

        this.listaEmpleados = this.listaEmpleados.map((x: Employee) => {
          return { ...x, vacunationState: this.vacunationStates[x.vacunationState] };
        });
        this.cargando = false;
      }
    });*/
  };

}
