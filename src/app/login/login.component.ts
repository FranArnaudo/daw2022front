import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enviado = false;
  loginForm =this.builder.group(
    {usuario:['',[Validators.required,Validators.minLength(4)]],
    password:['',[Validators.required]]}
  )
  constructor(private builder : FormBuilder, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.controls['usuario'].value)
    this.router.navigate(['home'])
    this.enviado=true;
  }
}
