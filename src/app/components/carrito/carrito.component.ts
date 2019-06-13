import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
public total="400.00";
  constructor(private _router:Router) { }

  ngOnInit() {
  }

  payProducts(){
    this._router.navigate(['/pagar-total/'+this.total]);
  }
}
