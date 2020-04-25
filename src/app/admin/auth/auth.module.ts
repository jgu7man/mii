import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AuthAdminComponent } from './components/admin/auth-admin.component';
import { AuthPublicComponent } from './components/public/auth-public.component';
import { AuthGoogleButtonComponent } from './components/auth-google-button/auth-google-button.component';
import { LoginButtonComponent, LoginButtonDialog } from './components/login-button/login-button.component';

/// <reference types="gapi" />

declare var gapi:any;

@NgModule({
  declarations: [
    AuthAdminComponent,
    AuthPublicComponent,
    AuthGoogleButtonComponent,
    LoginButtonComponent,
    LoginButtonDialog
  ],
  entryComponents: [
    LoginButtonDialog
  ],
  exports: [
    LoginButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }
