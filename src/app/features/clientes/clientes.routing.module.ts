import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'novo',
    component: FormClientesComponent
  },
  {
    path: 'editar/:id',
    component: FormClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
