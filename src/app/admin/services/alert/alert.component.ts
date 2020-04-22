import { Component, OnInit } from '@angular/core';
import { AlertMsgModel, AlertAskModel } from './alerts.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'mii-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  msg: AlertMsgModel
  ask: AlertAskModel
  constructor (
    private _alert: AlertService
  ) {
    this.msg = new AlertMsgModel( '' )
    this.ask = new AlertAskModel( '' )
   }

  ngOnInit() {
  }


  onNoClick() {
    
  }
}
