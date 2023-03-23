import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from './../../models/Usuario';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-usuario-estandar',
  templateUrl: './usuario-estandar.component.html',
  styleUrls: ['./usuario-estandar.component.css']
})
export class UsuarioEstandarComponent implements OnInit {
  usuario: any;
  idUsuario: string | null;
  listUsuarios:Usuario[]=[];
  constructor(private _usuarioService: UsuariosService,
            private aRouter: ActivatedRoute,) {
              this.idUsuario = this.aRouter.snapshot.paramMap?.get('_id')
            }

           
  ngOnInit(): void {
    this.obtenerUsuario();
  } 

  eliminarUsuario(id:any){
    this._usuarioService.eliminarUsuario(id).subscribe(data =>{
      this.obtenerUsuario();
    },error=>{
console.log(error);
    });
  }

  obtenerUsuario() {
    if (this.idUsuario) {
      this._usuarioService.getUsuario(this.idUsuario).subscribe(data => {
        this.usuario = data;
      }, error => {
        console.log(error);
      });
    }
  }
  
}

