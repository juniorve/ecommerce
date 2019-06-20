import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { MaestroServiceService } from '../../services/maestro-service.service';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
public total="400.00";
public url;
  constructor(private _router:Router, private maestroService:MaestroServiceService) {
    this.url=GLOBAL.url;
   }

  ngOnInit() {
  }

  payProducts(sumaTotal){
    this._router.navigate(['/pagar-total/'+sumaTotal+10]);
  }
}
