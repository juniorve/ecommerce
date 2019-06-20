import { ProductoService } from './../../services/producto.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { MaestroServiceService } from '../../services/maestro-service.service';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css'],
  providers:[ProductoService]
})
export class ShowProductoComponent implements OnInit,OnDestroy {

  public comentarioForm:FormGroup;
  public url;
  public idProducto;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public comentarios=[
    {ruta:"assets/images/productos/foto1.jpg",name:"Manuela Cervantes",email:"manuela@gmail.com",fecha:"27 febrero 2019",descripcion:"Compre el juego de cocina hace poco, pero la calidad es increible y ha sido la mejor elección."},
    {ruta:"assets/images/productos/foto2.jpg",name:"Andrea Sotomayo",email:"andrea@gmail.com",fecha:"12 mayo 2019",descripcion:"Decidi aprovechar la oferta y el hermoso diseño me enamoro, soy la envidia entre mis amigas."}
  ]
  constructor(private router:Router,private route:ActivatedRoute, private fb:FormBuilder,public maestroService:MaestroServiceService,private productoService:ProductoService) { 
   this.newForm();
   this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.idProducto = params['id'];
        console.log(this.idProducto);
        this.getProducto(this.idProducto);
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }


  getProducto(idProducto){
    console.log(idProducto);
   this.maestroService.busy= this.productoService.getProducto(idProducto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res=>{
          console.log(res);
      },
      error=>{

      }
    );
  }

  addComentario(){
    let comentario:any={};
    comentario.name=this.comentarioForm.controls["name"].value;
    comentario.fecha=this.comentarioForm.controls["fecha"].value;
    comentario.descripcion=this.comentarioForm.controls["descripcion"].value;
    comentario.ruta='assets/images/productos/blog_2.jpg';
    this.comentarios.push(comentario);
    console.log(this.comentarios);
    swal("Comentario realizado","Su comentario se registro exitosamente",{icon:"success",
    closeOnClickOutside: false
    }).then(
      (comentarioRegister)=>{
        if(comentarioRegister){
          this.newForm();
        }
      }
    );
  }

  newForm(){
    this.comentarioForm = this.fb.group({
      name:["",Validators.required],
      email:["",Validators.required],
      fecha:["13 de junio 2019"],
      descripcion:["",Validators.required]
    });
  }

}
