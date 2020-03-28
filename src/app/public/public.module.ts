import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { MaterialModule } from "../material.module";
import { PublicRoutingModule } from "./public-routing.module";

import { LoginComponent } from './components/navbar/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthModule } from '../admin/auth/auth.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AgentesComponent } from './components/usuarios/agentes/agentes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CrearAgenteComponent } from './components/usuarios/agentes/crear-agente/crear-agente.component';
import { FormCrearAgenteComponent } from './components/usuarios/agentes/form-crear-agente/form-crear-agente.component';
import { FormAgregarAgenteComponent } from './components/usuarios/agentes/form-agregar-agente/form-agregar-agente.component';




@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    NavbarComponent,
    UsuariosComponent,
    AgentesComponent,
    DashboardComponent,
    SidenavComponent,
    CrearAgenteComponent,
    FormCrearAgenteComponent,
    FormAgregarAgenteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    PublicRoutingModule
    
  ]
})
export class PublicModule { }
