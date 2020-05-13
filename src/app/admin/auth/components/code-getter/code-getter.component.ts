import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AgenteService } from '../../../../public/components/agentes/init-agente/form-crear-agente/crear-agente.service';

@Component({
  selector: 'mii-code-getter',
  templateUrl: './code-getter.component.html',
  styleUrls: ['./code-getter.component.scss']
})
export class CodeGetterComponent implements OnInit {

  params:{} = {}
  constructor (
    private _url: ActivatedRoute,
    private _auth: AuthService,
    private _agente: AgenteService
  ) { }

  async ngOnInit() {
    var waitFor = (ms) => new Promise( r => setTimeout(r, ms))
    var url = document.location.href
    var urlParamsSec = url.split( '?' )[1]
    var urlParams = urlParamsSec.split( '&' )
    var params = {}
    urlParams.forEach( param => {
      let keyValue = param.split( '=' )
      Object.defineProperty( params, keyValue[ 0 ], {
        value: keyValue[ 1 ], enumerable: true, writable: true, configurable: true,
      })
    } )

    await waitFor(1000)
    this._auth.authApi( params[ 'code' ] ).subscribe( res => {
      this._auth.authenticated$.next(res.access_token)
      localStorage.setItem( 'googleTokens', JSON.stringify( res ) )
      localStorage.setItem( 'access_token', JSON.stringify( res.access_token ) )
      window.opener.postMessage( 'close', 'http://localhost:4200/dashboard/agentes/init' )
      window.close()
    })
  }

}
