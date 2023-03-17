import { EmpresaService } from './../../services/empresa.service';
import { Rol } from './../../models/Rol';
import { Empresa } from './../../models/Empresa';
import { UsuariosService } from './../../services/usuarios.service';
import { RolService } from './../../services/rol.service';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listRoles:Rol[]=[];
  listEmpresas:Empresa[]=[];
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder,
              /* private router: Router*/
              private _usuarioService:UsuariosService, 
              private _rolService:RolService, 
              private _empresaService:EmpresaService) { 
    this.usuarioForm = this.fb.group({
      nombreUsuario:['',Validators.required],
      apePaterno:['',Validators.required],
      apeMaterno:['',Validators.required],
      email:['',Validators.email],
      edad:['',Validators.required],
      genero:['',Validators.required],
      rol:['',Validators.required],
      empresa:['',Validators.required],
      // status:['',Validators.required],
      contrasena:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerEmpresas();
  }

  crearCuenta(){
    const USUARIO: Usuario ={
      nombreUsuario : this.usuarioForm.get('nombreUsuario')?.value,
      apePaterno : this.usuarioForm.get('apePaterno')?.value,
      apeMaterno : this.usuarioForm.get('apeMaterno')?.value,
      email : this.usuarioForm.get('email')?.value,
      edad : this.usuarioForm.get('edad')?.value,
      genero : this.usuarioForm.get('genero')?.value,
      rol : this.usuarioForm.get('rol')?.value,
      empresa : this.usuarioForm.get('empresa')?.value,
      // status : this.usuarioForm.get('status')?.value,
      contrasena : this.usuarioForm.get('contrasena')?.value,
    }
    console.log(USUARIO);
    this._usuarioService.crearUsuario(USUARIO).subscribe(data =>{
      window.location.reload();
    },error =>{
      console.log(error);
      this.usuarioForm.reset();
    });
    
  }

  obtenerRoles(){
    this._rolService.getRoles().subscribe(data=>{
      console.log(data);
      this.listRoles=data;
    },error=>{
      console.log(error);
    });
  }

  obtenerEmpresas(){
    this._empresaService.getEmpresas().subscribe(data=>{
      console.log(data);
      this.listEmpresas=data;
    },error=>{
      console.log(error);
    });
  }
}
