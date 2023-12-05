import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { CpfPipe } from './pipes/cpf.pipe';

@NgModule({
  declarations: [NavBarComponent, DialogComponent, CpfPipe],
  imports: [
    CommonModule,
    MaterialModule,
    
  ],
  exports: [NavBarComponent, MaterialModule, CpfPipe]
})
export class SharedModule { }
