import { NgModule} from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: 'panel', component: AdminComponent },
      { path: '', component: PublicComponent}    
  ] },
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
export class AppRoutingModule { }
