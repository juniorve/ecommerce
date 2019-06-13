import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  public comentarioForm:FormGroup;

  public comentarios=[
    {ruta:"assets/images/productos/foto1.jpg",name:"Manuela Cervantes",email:"manuela@gmail.com",fecha:"27 febrero 2019",descripcion:"Compre el juego de cocina hace poco, pero la calidad es increible y ha sido la mejor elección."},
    {ruta:"assets/images/productos/foto2.jpg",name:"Andrea Sotomayo",email:"andrea@gmail.com",fecha:"12 mayo 2019",descripcion:"Decidi aprovechar la oferta y el hermoso diseño me enamoro, soy la envidia entre mis amigas."}
  ]
  constructor(private fb:FormBuilder) { 
   this.newForm();
  }

  ngOnInit() {
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
