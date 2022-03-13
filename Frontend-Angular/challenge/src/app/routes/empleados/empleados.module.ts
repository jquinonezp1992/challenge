import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmpleadosRoutingModule } from './empleados-routing.module';

const COMPONENTS: any[] = [];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    EmpleadosRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class EmpleadosModule { }
