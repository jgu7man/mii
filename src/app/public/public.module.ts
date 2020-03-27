import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { MaterialModule } from "../material.module";



@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PublicModule { }
