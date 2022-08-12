import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NacionalidadesService } from '../servicios/nacionalidades.service';

@Component({
  selector: 'app-nacionalidades',
  templateUrl: './nacionalidades.component.html',
  styleUrls: ['./nacionalidades.component.css'],
})
export class NacionalidadesComponent implements OnInit {
  searchForm = this.builder.group({
    text: [''],
  });
  paginationForm = this.builder.group({
    size: [''],
    page: [''],
  });
  constructor(
    private servicioNacionalidades: NacionalidadesService,
    private builder: FormBuilder,
    private router: Router
    ) { }
    
  nacionalidades: any;
  facultades: any;
  filtro: any = {};
  previousSortField: String = 'id';
  isASC:any;
  paginado: any = {
    totalPages: 1,
    currentPage: 0,
  };
  size: Number = 4;
  page: Number = 0;
  error: any;

  ngOnInit(): void {
    console.log('')
    this.filtro = {
      page: this.page,
      size: this.size
    }
    this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
  }
  sortBy(sortField:any){
    if(sortField!== this.previousSortField){
      this.isASC = true;
      this.previousSortField = sortField
    }else{
      this.isASC = !this.isASC
    }

    this.filtro ={
      ...this.filtro,
      sort: sortField,
      order:this.isASC ? 'ASC' : 'DESC'
    }
    this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
  }
  search() {
    this.filtro = {
      ...this.filtro,
      text: this.searchForm.controls['text'].value,
      page: 0,
      size: this.size
    }
    this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
  }
  setPage(page: Number) {
    this.page = page
    this.filtro = {
      ...this.filtro,
      page: this.page
    }
    this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
  }
  setSize(size: any) {
    this.size = size.value
    this.filtro = {
      ...this.filtro,
      size: this.size
    }
    this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
  }
  goToEdit(id: Number) {
    this.router.navigate([`nacionalidades/editar`, id])
  }
  delete(id: Number) {
    this.servicioNacionalidades.borrarNacionalidad(id).subscribe((res: any) => { }, (error: HttpErrorResponse) => { this.error = true })
    setTimeout(()=>{
      this.servicioNacionalidades
      .getNacionalidades(this.filtro)
      .subscribe((res:any) =>{
        this.nacionalidades = res.content;
        this.paginado = {
          totalPages: res.totalPages,
          currentPage: res.number
        }
      });
    },1000)
  }
  goHome(): void {
    this.router.navigate(['home']);
  }
  goCreate(): void {
    this.router.navigate(['nacionalidades/nuevo']);
  }
}
