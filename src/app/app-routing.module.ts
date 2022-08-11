import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NacionalidadesComponent } from './nacionalidades/nacionalidades.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jugadores/nuevo', component: RegisterComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'jugadores/editar/:id', component: EditUserComponent },
  { path: 'nacionalidades', component: NacionalidadesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
