import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-pagar-total',
  templateUrl: './pagar-total.component.html',
  styleUrls: ['./pagar-total.component.css'],
  providers: []

})
export class PagarTotalComponent implements OnInit {
  public totalForm:FormGroup
  envios = [
    { name: 'Si' },
    { name: 'No' },
  ];
  public identity;
  public title: String = 'Pago del total de compras';
  public token;
  public url;
  public mensajeError: String;
  public imagenTemp: any;

  constructor( private fb:FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) {
    // this.url = GLOBAL.url;
  this.newForm();
  }

  ngOnInit() { 
    this._route.params.forEach((params: Params) => {
      if (params['total']) {
        this.totalForm.controls["total"].setValue(params['total']);
      }
    });
  }


  saveTotal(){
    if(this.totalForm.valid==true){
      console.log(this.totalForm.value);
      swal("Pago realizado","El pago de productos fue realizado correctamente",{icon:'success', closeOnClickOutside: false
    }).then(
      (pagoProductos)=>{
        if(pagoProductos){
          // this.newForm();
          this._router.navigate(['/principal']);
        }
      }
    );
    }else{
      swal("Campos incompletos","Algunos campos del formulario no fueron completados","warning");
    }
  }

  newForm(){
    this.totalForm=this.fb.group({
      nombre:["",Validators.required],
      email:["",Validators.compose([Validators.email,Validators.required])],
      dni:[null,Validators.required],
      numCuenta:[null,Validators.required],
      codigo:["",Validators.required],
      total:[null,Validators.required],
      vencimiento:["",Validators.required]
    });
    this.totalForm.controls["total"].disable();
  }



}
