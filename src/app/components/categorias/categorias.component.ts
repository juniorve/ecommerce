import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addProducto(){
    swal("Producto agregado","El producto fue agregado al carrito","success");
  }
}
