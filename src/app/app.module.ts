import { NgModule } from '@angular/core';
import { ComunesModule } from './comunes.module';

// *Global modules
import { MaterialModule } from "./material.module";
import { FirebaseModule } from './Firebase.module';

// *ROOT modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// *Public modules
import { PublicModule } from "./public/public.module";
import { PublicRoutingModule } from "./public/public-routing.module";

// * Admin modules
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from "./admin/admin-routing.module";
import { AuthModule } from './admin/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComunesModule,
    MaterialModule,
    PublicModule,
    PublicRoutingModule,
    AdminModule,
    AdminRoutingModule,
    FirebaseModule,
    AuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
