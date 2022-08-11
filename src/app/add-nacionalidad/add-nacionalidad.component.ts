import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-nacionalidad',
  templateUrl: './add-nacionalidad.component.html',
  styleUrls: ['./add-nacionalidad.component.css']
})
export class AddNacionalidadComponent implements OnInit {

  nacionalityForm = this.builder.group({
    nombre:['',[Validators.required,Validators.minLength(2)]],
    codigo:[''],
    descripcion:['']
  })
  enviado: boolean = false;
  constructor(private builder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
  }
  goHome( ){
    this.router.navigate(['home'])
  }
  goToList(){
    this.router.navigate(['nacionalidades'])
  }
  onSubmit(event:any){
    this.enviado = true;
  }
}
