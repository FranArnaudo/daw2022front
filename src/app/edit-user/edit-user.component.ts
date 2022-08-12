import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { RolesService } from '../servicios/roles.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id:any;
  enviado = false;
  nacionalidades : any;
  deportes :any;
  facultades :any;
  jugador : any ={};
  roles: any;
  errores:any;
  registerForm =this.builder.group(
    {
      firstname:['',[Validators.required,Validators.minLength(2)]],
      lastname:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      dni:['',[Validators.required,Validators.min(99999)]],
      phone:['',[Validators.required,Validators.min(1000000)]],
      legajo:['',[Validators.required]],
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
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
    //Cargar nacionalidades
    this.route.params.subscribe((params: any) => this.id = params['id']);
    
    this.servicioNacionalidades.getNacionalidades().subscribe((res)=> this.nacionalidades = res)
    this.servicioRoles.getRoles().subscribe(res=>this.roles =res)
    this.servicioDisciplinas.getDisciplinas().subscribe(res => this.deportes = res)
    this.servicioFacultades.getFacultades().subscribe(res=>this.facultades = res)
    this.servicioJugadores.getJugador(this.id).subscribe((res:any)=>{
      this.registerForm.controls['firstname'].setValue(res.nombre)
      this.registerForm.controls['lastname'].setValue(res.apellido)
      this.registerForm.controls['email'].setValue(res.email)
      this.registerForm.controls['dni'].setValue(res.dni)
      this.registerForm.controls['phone'].setValue(res.telefono)
      this.registerForm.controls['legajo'].setValue(res.legajo)
      this.registerForm.controls['nacimiento'].setValue(moment(res.fechaNacimiento).format('yyyy-MM-DD').toString())
      this.registerForm.controls['facultad'].setValue(res.facultad.id)
      this.registerForm.controls['sport'].setValue(res.disciplina.id)
      this.registerForm.controls['nacionality'].setValue(res.nacionalidad.id)
      this.registerForm.controls['rol'].setValue(res.rol.id)

    })
  }
  goHome():void{
    this.router.navigate(['home'])
  }
  goToList():void{
    this.router.navigate(['jugadores'])
  }
  onSubmit(e : Event){
    e.preventDefault()
    this.jugador.id = this.id;
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
    
    this.errores = Boolean(
      this.registerForm.controls['firstname'].invalid || 
      this.registerForm.controls['lastname'].invalid || 
      this.registerForm.controls['email'].invalid || 
      this.registerForm.controls['dni'].invalid || 
      this.registerForm.controls['phone'].invalid || 
      this.registerForm.controls['legajo'].invalid || 
      this.registerForm.controls['nacimiento'].invalid || 
      this.registerForm.controls['facultad'].invalid || 
      this.registerForm.controls['sport'].invalid || 
      this.registerForm.controls['nacionality'].invalid || 
      this.registerForm.controls['rol'].invalid 
      )
      this.enviado=true;
    if(!this.errores){
      this.servicioJugadores.editarJugador(this.jugador).subscribe((res:any)=>{
        this.router.navigate(['jugadores']);
      },(error:any)=>{})
    }

  }
}
