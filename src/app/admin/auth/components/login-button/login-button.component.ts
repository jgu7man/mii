import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { auth } from 'firebase';

declare var gapi: any;

@Component({
  selector: 'mii-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  public authIsLoaded: boolean = false;
  public isLoggedIn: boolean = false;
  public user: any;

  constructor(
    public dialog: MatDialog,
    public _auth: AuthService
  ) { }

  ngOnInit() {
    this._auth.isLoaded$.subscribe( value => {
        this.authIsLoaded = value;
    });

    this._auth.isLoggedIn$.subscribe( value => {
        this.isLoggedIn = value;
    });

    this._auth.user$.subscribe( value => {
      console.log(value);
      this.user = value;
    });

    this._auth.loadAuth2();
  }
  createProject(): void {
    this._auth.createProject();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginButtonDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.user){
        console.log(this.user);
        return;
      }
      this._auth.googleSingIn();
    });
  }

}

@Component({
  selector: 'mii-login-button-dialog',
  templateUrl: './login-button-dialog.html'
})
export class LoginButtonDialog {

  constructor(
   public dialogRef: MatDialogRef<LoginButtonDialog>,
   ) {}

  onClick(): void {
    this.dialogRef.close();
  }

}
