import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestroServiceService {
  public busy:Subscription;
  public carritoProd:any[]=[];
  public sumaTotal=0;

  constructor() { }

  addCarrito(producto:any){
    this.sumaTotal=0;
    this.carritoProd.push(producto);
    for(let prod of this.carritoProd){
      this.sumaTotal=this.sumaTotal+prod.precioVenta;
    }
    console.log(this.carritoProd,this.sumaTotal);
  }
}
