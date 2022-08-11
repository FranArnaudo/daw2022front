import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface Option {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class FacultadesService {

  constructor(private http : HttpClient) { }
  getFacultades(){
    return this.http.get('http://localhost:8080/facultades');
  }
}
