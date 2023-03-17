import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
   listUsuarios:Usuario[]=[];
   usuarios: Usuario[]=[];
   campo: string = 'nombreUsuario';
   orden: number = 1;

  constructor(private _adminService: UsuariosService,
              private http: HttpClient) {}
  ngOnInit(): void {
    //this.obtenerUsuarios();
     //this.obtenerUsuariosOrdenados();
     this._adminService
      .getUsuariosOrdenados(this.campo, this.orden)
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  obtenerUsuarios(){
    this._adminService.getUsuarios().subscribe(data=>{
      console.log(data);
      this.listUsuarios=data;
    },error=>{
      console.log(error);
    });
  }

  eliminarUsuario(id:any){
    this._adminService.eliminarUsuario(id).subscribe(data =>{
      this.obtenerUsuariosOrdenados();
    },error=>{
console.log(error);
    });
  }
  obtenerUsuariosOrdenados(): void {
    this._adminService
      .getUsuariosOrdenados(this.campo, this.orden)
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  handleChangeCampo(event: Event): void {
    this.campo = (event.target as HTMLSelectElement).value;
    this.obtenerUsuariosOrdenados();
  }

  handleChangeOrden(event: Event): void {
    this.orden = Number((event.target as HTMLSelectElement).value);
    this.obtenerUsuariosOrdenados();
  }
  
  
}
