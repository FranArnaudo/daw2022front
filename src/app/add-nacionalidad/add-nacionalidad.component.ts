import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NacionalidadesService } from '../servicios/nacionalidades.service';

@Component({
  selector: 'app-add-nacionalidad',
  templateUrl: './add-nacionalidad.component.html',
  styleUrls: ['./add-nacionalidad.component.css']
})
export class AddNacionalidadComponent implements OnInit {

  nacionalityForm = this.builder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    codigo: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: ['']
  })
  enviado: boolean = false;
  nacionalidad: any;
  errores: any;
  constructor(private builder: FormBuilder, private router: Router, private servicioNacionalidades: NacionalidadesService) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigate(['home'])
  }
  goToList() {
    this.router.navigate(['nacionalidades'])
  }
  onSubmit(e: Event) {
    e.preventDefault()
    this.nacionalidad = {
      nombre: this.nacionalityForm.controls['nombre'].value,
      codigo: this.nacionalityForm.controls['codigo'].value,
      descripcion: this.nacionalityForm.controls['descripcion'].value
    }
    this.enviado = true;
    this.errores = Boolean(this.nacionalityForm.controls['nombre'].invalid) || Boolean(this.nacionalityForm.controls['codigo'].invalid)
    if (!this.errores) {
      this.servicioNacionalidades.guardarNacionalidad(this.nacionalidad).subscribe((res: any) => {
        this.router.navigate(['nacionalidades']);
      }, (error: any) => { })
    }
  }
}
