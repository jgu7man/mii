import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// *Global modules
import { MaterialModule } from "./material.module";
import { FirebaseModule } from './Firebase.module';

// *ROOT modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// *Public modules
import { PublicModule } from "./public/public.module";

// * Admin modules
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './admin/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PublicModule,
    AdminModule,
    FirebaseModule,
    AuthModule
  ],
  providers: [
    DatePipe,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
