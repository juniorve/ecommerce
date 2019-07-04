import { ComprobanteService } from './../../services/comprobante.service';
import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MaestroService } from '../../services/maestro-service.service';
import { takeUntil } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
declare var jsPDF: any;


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  // encapsulation: ViewEncapsulation.None,
  providers: [MaestroService,ComprobanteService,ProductoService]
})
export class DialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public detalle:any[]=[];
  public productos:any[]=[];

  constructor(private productoService:ProductoService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private comprobanteService:ComprobanteService
    ,private dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, public maestroService: MaestroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.getDetalleComprobante();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getDetalleComprobante(){
   this.maestroService.busy=this.comprobanteService.getDetalleComprobante(this.data.comprobante._id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res=>{
        console.log(res);
        if(res.detalleComprobante){
          this.detalle=res.detalleComprobante;
          for(let item of this.detalle){
              this.getProductos(item)
          }
          console.log(this.detalle);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  getProductos(item:any)
  {        
     this.maestroService.busy= this.productoService.getProducto(item.idProducto).pipe(takeUntil(this.ngUnsubscribe))
     .subscribe(
            response =>{
              console.log(response);
              if(response.producto){
                item.nameProducto= response.producto.nombre;
                item.color= response.producto.color;
                item.material= response.producto.material;
              } 
            },
          error =>{
          }
     );
    }
}

}

