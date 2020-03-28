import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublicComponent } from './public.component';
import { AgentesComponent } from './components/usuarios/agentes/agentes.component';
import { CrearAgenteComponent } from './components/usuarios/agentes/crear-agente/crear-agente.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          {
            path: '', component: AgentesComponent, children: [
              { path: '', component: CrearAgenteComponent}
            ]}
          ]}
        ]}
  ];


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'disabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
