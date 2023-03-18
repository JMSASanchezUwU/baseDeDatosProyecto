import { Usuario } from './../models/Usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:4000/api/Usuario/';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarUsuario(id:string):Observable<any>{
    return this.http.delete(this.url +  id);
  }

  crearUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(this.url, usuario);
  }

  getUsuario(id:string):Observable<any>{
    return this.http.get(this.url + id);
  }

  editarUsuario(id:string, usuario:Usuario):Observable<any>{
    return this.http.put(this.url + id, usuario);
  }
  
  getUsuariosOrdenados(campo: string, orden: number, filtro:string, valor:string): Observable<Usuario[]> {
    const params = new HttpParams()
      .set('campo', campo)
      .set('orden', orden)
      .set('filtro', filtro)
      .set('valor', valor);
    console.log(params); // Agrega esta línea para ver los parámetros en la consola
    return this.http.get<Usuario[]>(this.url, { params });
  }  
}
