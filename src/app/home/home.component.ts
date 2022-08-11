import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private builder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
  }

  navigateToRegister(){
    this.router.navigate(['jugadores/nuevo'])
  }
  navigateToJugadores(){
    this.router.navigate(['jugadores'])
  }

}
