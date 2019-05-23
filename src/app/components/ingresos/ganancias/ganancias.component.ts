
 import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare const swal:any;


@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.css'],
  providers: [UserService]
})
export class GanananciasComponent implements OnInit {

public identity;
public token;
public url;
public ganancias:any[]=[ 
  {}

];
public _idEvento:String;
  constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService) {
        this.url=GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
     }

  ngOnInit() {
    this.getProductos();
  }
 
public cantidad:any=0;
getProductos()
{                  
  this.ganancias=[
    {usuario:'Juan Manuel', fecha:'16/10/2018', hora:'12:35', prenda:'Olla oster', cantidad:2, ganancia:'S/. 50'},
    {usuario:'María Lopez', fecha:'21/10/2018', hora:'2:40', prenda:'Cocina a gas', cantidad:4, ganancia:'S/.90'},
    {usuario:'Sofia Mendoza', fecha:'24/10/2018', hora:'3:10', prenda:'Olla a presión', cantidad:10, ganancia:'S/. 200'},
    {usuario:'Joaquin Torres', fecha:'2/11/2018', hora:'4:30', prenda:'Set de cubiertos bosh', cantidad:5, ganancia:'S/ .140'},
    {usuario:'Erika Chavez', fecha:'11/11/2018', hora:'11:14', prenda:'Utencilios de cocina', cantidad:8, ganancia:'S/. 100'},
  ]
}
}
 