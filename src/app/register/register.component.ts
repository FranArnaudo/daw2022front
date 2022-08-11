import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { RolesService } from '../servicios/roles.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  enviado = false;
  nacionalidades : any;
  deportes :any;
  facultades :any;
  jugador : any = {};
  roles: any;

  registerForm =this.builder.group(
    {
      firstname:['',[Validators.required,Validators.minLength(2)]],
      lastname:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      dni:['',[Validators.required,Validators.min(1)]],
      phone:['',[Validators.required,Validators.minLength(7)]],
      legajo:['',[Validators.required,Validators.minLength(4)]],
      nacimiento:['',[Validators.required]],
      facultad:['',[Validators.required]],
      sport:['',[Validators.required]],
      nacionality:['',[Validators.required]],
      rol:['',[Validators.required]]
    }
  )
  constructor(private builder : FormBuilder,
     private servicioNacionalidades : NacionalidadesService,
     private servicioRoles : RolesService, 
     private servicioFacultades:FacultadesService,
      private servicioDisciplinas : DisciplinasService, 
      private servicioJugadores : JugadorService,
      private router: Router
      ) { }

  ngOnInit(): void {
    //Cargar nacionalidades
    this.servicioNacionalidades.getNacionalidades().subscribe((res)=> this.nacionalidades = res)
    this.servicioRoles.getRoles().subscribe(res=>this.roles =res)
    this.servicioDisciplinas.getDisciplinas().subscribe(res => this.deportes = res)
    this.servicioFacultades.getFacultades().subscribe(res=>this.facultades = res)
    
    console.log("~ this.deportes", this.deportes)
  }

  goHome():void{
    this.router.navigate(['home'])
  }
  goToList():void{
    this.router.navigate(['jugadores'])
  }
  onSubmit(e : Event){
    e.preventDefault()
    console.log(this.nacionalidades)
    this.jugador.nombre = this.registerForm.controls['firstname'].value;
    this.jugador.apellido = this.registerForm.controls['lastname'].value;
    this.jugador.email = this.registerForm.controls['email'].value;
    this.jugador.dni = this.registerForm.controls['dni'].value;
    this.jugador.telefono = this.registerForm.controls['phone'].value;
    this.jugador.legajo = this.registerForm.controls['legajo'].value;
    this.jugador.fechaNacimiento = moment(this.registerForm.controls['nacimiento'].value).toDate();
    this.jugador.facultad = {id: Number(this.registerForm.controls['facultad'].value)}
    this.jugador.disciplina = {id: Number(this.registerForm.controls['sport'].value)}
    this.jugador.nacionalidad = {id: Number(this.registerForm.controls['nacionality'].value)}
    this.jugador.rol = {id: Number(this.registerForm.controls['rol'].value)}
    
    this.servicioJugadores.guardarJugador(this.jugador)

    this.enviado=true;
    this.router.navigate(['jugadores']);
  }
}
