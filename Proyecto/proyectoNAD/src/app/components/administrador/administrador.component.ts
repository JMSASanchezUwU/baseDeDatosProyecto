import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';


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
   filtro: string = "null";
   valor:string = "";

  constructor(private _adminService: UsuariosService) {}
  ngOnInit(): void {
    this.obtenerUsuarios();
     //this.obtenerUsuariosOrdenados();
    //  this._adminService
    //   .getUsuariosOrdenados(this.campo, this.orden,this.filtro,this.valor)
    //   .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  obtenerUsuarios(){
    this._adminService.getUsuarios().subscribe(data=>{
      console.log(data);
      this.usuarios=data;
    },error=>{
      console.log(error);
    });
  }

  eliminarUsuario(id:any){
    this._adminService.eliminarUsuario(id).subscribe(data =>{
      if (this.filtro =="" && this.valor=="") {
        this.obtenerUsuarios();
      } else {
        this.obtenerUsuariosOrdenados();
      }
     
    },error=>{
console.log(error);
    });
  }
  obtenerUsuariosOrdenados(): void {
    this._adminService
      .getUsuariosOrdenados(this.campo, this.orden,this.filtro,this.valor)
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

  handleChangeFiltro(event: Event): void {
    this.filtro = (event.target as HTMLSelectElement).value;
  }

  // handleChangeInput(event: Event): void {
  //   this.valor = (event.target as HTMLInputElement).value;
  //   this.obtenerUsuariosOrdenados();
  // }
  
  handleChangeInput( valor: string): void {
    this.valor = valor;
    this.obtenerUsuariosOrdenados();
  }
  
  
}
