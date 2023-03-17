import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from './../../models/Usuario';



@Component({
  selector: 'app-usuario-estandar',
  templateUrl: './usuario-estandar.component.html',
  styleUrls: ['./usuario-estandar.component.css']
})
export class UsuarioEstandarComponent implements OnInit {
  usuario: any;
  idUsuario= '640ff15447e5f9c1f379a5a6';
  listUsuarios:Usuario[]=[];
  constructor(private _usuarioService: UsuariosService) {}
  ngOnInit(): void {
    this.obtenerUsuario(this.idUsuario);
  } 

  obtenerUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data=>{
      this.listUsuarios=data;
    },error=>{
      console.log(error);
    });
  }
  eliminarUsuario(id:any){
    this._usuarioService.eliminarUsuario(id).subscribe(data =>{
      this.obtenerUsuario(this.idUsuario);
    },error=>{
console.log(error);
    });
  }

  obtenerUsuario(id: string) {
    
    this._usuarioService.getUsuario(id).subscribe(data => {
      this.usuario = data;
    }, error => {
      console.log(error);
    });
  }
}

