import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { FacultadesService } from '../servicios/facultades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
 
  searchForm =this.builder.group(
    {
      text:[''],
      facultad:[''],
      nacionalidad:[''],
    }
  )
  paginationForm =this.builder.group(
    {
      size:[''],
      page:['']
    }
  )
  constructor(private servicioJugadores : JugadorService, 
     private servicioNacionalidades : NacionalidadesService, 
     private servicioFacultades : FacultadesService, 
     private builder: FormBuilder,
     private router : Router
     ) { }
  jugadores:any;
  nacionalidades : any;
  facultades :any;
  filtro: any = {}
  paginado: any;
  size: Number = 4;
  page: Number = 0;

  
  ngOnInit(): void {
    console.log('')
    this.servicioJugadores.getJugadores().subscribe((res : any) => {
      this.paginado = {
        totalPages: res.totalPages,
        currentPage: res.number
      }
      this.jugadores = res.content
    });
    this.servicioNacionalidades.getNacionalidades().subscribe((res)=> this.nacionalidades = res);
    this.servicioFacultades.getFacultades().subscribe(res=>this.facultades = res);
  }
  setPage(page:Number):void{
    this.page = page
    this.filtro = {
      ...this.filtro,
      page:this.page
    }
    this.servicioJugadores.getJugadores(this.filtro).subscribe((res : any) => {
      this.paginado = {
        totalPages: res.totalPages,
        currentPage: res.number
      }
      this.jugadores = res.content
    });
  }
  

  setSize(size:any):void{
    this.size = size.value
    this.filtro = {
      ...this.filtro,
      size: this.size
    }
    this.servicioJugadores.getJugadores(this.filtro).subscribe((res : any) => {
      this.paginado = {
        totalPages: res.totalPages,
        currentPage: res.number
      }
      this.jugadores = res.content
    });
  }
  
  search(): void {
    this.filtro = {
      ...this.filtro,
      text: this.searchForm.controls['text'].value,
      facultad:this.searchForm.controls['facultad'].value,
      nacionalidad: this.searchForm.controls['nacionalidad'].value,
      page: 0,
      size: this.size
    }
    this.servicioJugadores.getJugadores(this.filtro).subscribe((res : any) => {
      this.paginado = {
        totalPages: res.totalPages,
        currentPage: res.number
      }
      this.jugadores = res.content
    });
  }

  goHome():void{
    this.router.navigate(['home'])
  }
  goCreate():void{
    this.router.navigate(['jugadores/nuevo'])
  }
  goToEdit(id: Number):void{
    this.router.navigate(['jugadores/editar',id])
  }
  delete(id:Number):void{
    this.servicioJugadores.borrarJugador(id).then
    setTimeout(()=>{
      this.servicioJugadores.getJugadores(this.filtro).subscribe((res : any) => {
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
        this.jugadores = res.content
      });
    },1000)
    }
}
