import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { MaterialModule } from "../material.module";

import { LoginComponent } from './navbar/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthModule } from '../admin/auth/auth.module';




@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule
  ]
})
export class PublicModule { }
