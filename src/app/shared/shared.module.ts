import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [NavBarComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[NavBarComponent, MaterialModule]
})
export class SharedModule { }
