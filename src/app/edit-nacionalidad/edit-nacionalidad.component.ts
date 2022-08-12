import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-nacionalidad',
  templateUrl: './edit-nacionalidad.component.html',
  styleUrls: ['./edit-nacionalidad.component.css']
})
export class EditNacionalidadComponent implements OnInit {

  
  nacionalityForm = this.builder.group({
    nombre:['',[Validators.required,Validators.minLength(2)]],
    codigo:['',[Validators.required,Validators.minLength(2)]],
    descripcion:['']
  })
  id:any;
  enviado: boolean = false;
  nacionalidad: any;
  errores:any;
  constructor(private builder: FormBuilder, private router : Router, private servicioNacionalidades : NacionalidadesService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.id = params['id']);
    this.servicioNacionalidades.getNacionalidad(this.id).subscribe((res:any)=>{
      this.nacionalityForm.controls['nombre'].setValue(res.nombre)
      this.nacionalityForm.controls['codigo'].setValue(res.codigo)
      this.nacionalityForm.controls['descripcion'].setValue(res.descripcion)
    })
  }
  goHome( ){
    this.router.navigate(['home'])
  }
  goToList(){
    this.router.navigate(['nacionalidades'])
  }
  onSubmit(e: Event){
    e.preventDefault()
    this.nacionalidad = {
      id: this.id,
      nombre: this.nacionalityForm.controls['nombre'].value,
      codigo: this.nacionalityForm.controls['codigo'].value,
      descripcion: this.nacionalityForm.controls['descripcion'].value
    }
    this.errores = Boolean(this.nacionalityForm.controls['nombre'].invalid) || Boolean(this.nacionalityForm.controls['codigo'].invalid)
    this.enviado = true;
    if(!this.errores){
      this.servicioNacionalidades.actualizarNacionalidad(this.nacionalidad).subscribe((res:any)=>{this.router.navigate(['nacionalidades'])},(err:any)=>{})
    }
  }
}
