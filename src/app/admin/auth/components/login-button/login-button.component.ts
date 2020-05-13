import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mii-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public _auth: AuthService
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginButtonDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this._auth.googleSingIn()
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
