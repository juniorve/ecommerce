import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MaestroService } from '../../services/maestro-service.service';
import { GLOBAL } from 'src/app/services/global';
import { Subject } from 'rxjs/Subject';
import swal from "sweetalert";
import { takeUntil } from 'rxjs/operators';
import { ComprobanteService } from '../../services/comprobante.service';

@Component({
  selector: 'app-pagar-total',
  templateUrl: './pagar-total.component.html',
  styleUrls: ['./pagar-total.component.css'],
  providers: [ComprobanteService]
})
export class PagarTotalComponent implements OnInit, OnDestroy {
  public totalForm: FormGroup
  envios = [
    { name: 'Si' },
    { name: 'No' },
  ];
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public identity;
  public title: String = 'Pago del total de compras';
  public token;
  public url;
  public mensajeError: String;
  public imagenTemp: any;
  public date = new FormControl(new Date());
  public date1 = new FormControl(new Date());

  constructor(private fb: FormBuilder, private maestroService: MaestroService, private comprobanteService: ComprobanteService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    this.newForm();
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      if (params['total']) {
        this.totalForm.controls["total"].setValue(parseFloat(params['total']));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  saveTotal() {
    console.log(this.totalForm.getRawValue());
    if (this.totalForm.valid == true) {
      this.maestroService.busy = this.comprobanteService.saveComprobante(this.totalForm.getRawValue()).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          res => {
            swal("Pago realizado", "El pago de productos fue realizado correctamente", {
              icon: 'success', closeOnClickOutside: false
            }).then(
              (pagoProductos) => {
                if (pagoProductos) {
                  console.log(res);
                  for (let i=0;i<this.maestroService.carritoProd.length;i++) {
                    let data: any = {};
                    data.cantidad = this.maestroService.carritoProd[i].cantidadCarrito;
                    data.precio = this.maestroService.carritoProd[i].precioVenta;
                    data.idProducto = this.maestroService.carritoProd[i]._id;
                    data.idComprobante = res.comprobante._id;
                    this.maestroService.busy = this.comprobanteService.saveDetalleComprobante(data).pipe(takeUntil(this.ngUnsubscribe))
                      .subscribe(
                        resp => {
                          console.log(resp);
                          console.log(i);
                          if(i==this.maestroService.carritoProd.length-1){
                            this.maestroService.clean();
                            this._router.navigate(['/principal']);
                          }
                        },
                        err => {
                          console.log(err);
                        }
                      );;
                  }
                    
                }
              }
            );
          },
          error => {
            console.log(error);
          }
        );
    } else {
      swal("Campos incompletos", "Algunos campos del formulario no fueron completados", "warning");
    }
  }

  newForm() {
    this.totalForm = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      dni: [null, Validators.required],
      numCuenta: [null, Validators.required],
      cvv: ["", Validators.required],
      total: [null, Validators.required],
      vencimiento: [""],
      fecha: [""]
    });
    this.totalForm.controls["total"].disable();
    this.totalForm.controls["vencimiento"].setValue(this.date.value);
    this.totalForm.controls["fecha"].setValue(this.date1.value);
  }



}
