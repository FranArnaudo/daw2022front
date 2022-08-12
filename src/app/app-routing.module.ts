import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NacionalidadesComponent } from './nacionalidades/nacionalidades.component';
import { AddNacionalidadComponent } from './add-nacionalidad/add-nacionalidad.component';
import { EditNacionalidadComponent } from './edit-nacionalidad/edit-nacionalidad.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jugadores/nuevo', component: RegisterComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'jugadores/editar/:id', component: EditUserComponent },
  { path: 'nacionalidades', component: NacionalidadesComponent },
  { path: 'nacionalidades/nuevo', component: AddNacionalidadComponent },
  { path: 'nacionalidades/editar/:id', component: EditNacionalidadComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
