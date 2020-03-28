import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/auth/auth.service';

@Component({
  selector: 'mii-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public _auth: AuthService
  ) { }

  ngOnInit() {
  }

}
