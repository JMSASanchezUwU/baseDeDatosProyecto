import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { UsuarioEstandarComponent } from './components/usuario-estandar/usuario-estandar.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'admin', component: AdministradorComponent},
  {path: 'user', component: UsuarioEstandarComponent},
  {path: 'editar-user/:id', component:EditarUsuarioComponent},
  {path: '**', redirectTo:'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
