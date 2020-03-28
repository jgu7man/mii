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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    PublicRoutingModule
    
  ]
})
export class PublicModule { }
