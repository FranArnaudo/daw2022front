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
    name: [''],
  });
  paginationForm = this.builder.group({
    size: [''],
    page: [''],
  });
  constructor(
    private servicioNacionalidades: NacionalidadesService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  nacionalidades: any;
  facultades: any;
  filtro: any = {};
  paginado: any;
  size: Number = 1;
  page: Number = 0;

  ngOnInit(): void {
    this.servicioNacionalidades
      .getNacionalidades()
      .subscribe((res) => (this.nacionalidades = res));
  }

  goHome(): void {
    this.router.navigate(['home']);
  }
  goCreate(): void {
    this.router.navigate(['jugadores/nuevo']);
  }
}
