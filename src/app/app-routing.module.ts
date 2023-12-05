import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClientesComponent } from './features/clientes/components/form-clientes/form-clientes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente', pathMatch: 'full',
  },
  {
    path: 'cliente',
    loadChildren: () => import('./features/clientes/clientes.module').then(m => m.ClientesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
