import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './clientes.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [TableComponent, FormClientesComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot()
  ]
})
export class ClientesModule { }
