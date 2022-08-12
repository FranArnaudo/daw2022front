import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface Option {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {
  
  params: any;

  constructor(private http : HttpClient) { }
  getNacionalidades(filtro?:any){
    if(!filtro){
      return this.http.get('http://localhost:8080/nacionalidades');
    }
    this.params = `?` +( filtro.text !== undefined ? `filtro=${filtro.text}&` : '') + (filtro.page !== undefined ? `page=${filtro.page}&`:'') + (filtro.size ?`size=${filtro.size}`:'')  
    return this.http.get(`http://localhost:8080/nacionalidades${this.params}`);
  }
  getNacionalidad(id: Number):any{
    return this.http.get(`http://localhost:8080/nacionalidades/${id}`)
  }
  guardarNacionalidad(nacionalidad: any){
    return this.http.post('http://localhost:8080/nacionalidades',nacionalidad)
  }
  actualizarNacionalidad(nacionalidad: any){
    return this.http.put('http://localhost:8080/nacionalidades',nacionalidad)
  }
  borrarNacionalidad(id:Number){
    return this.http.delete(`http://localhost:8080/nacionalidades/${id}`)
  }
}
