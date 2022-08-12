import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  //a esta url vamos a hacer las llamadas
  params : String = ''
  constructor(private http : HttpClient) { 
    
  }

  guardarJugador(jugador : any){
    return this.http.post(`http://localhost:8080/jugadores`, jugador)
  }
  getJugador(id:any):any{
    return this.http.get(`http://localhost:8080/jugadores/${id}`)
  }
  getJugadores(filtro?:any){
    if(filtro){
      this.params = `?` +( filtro.text !== undefined ? `filtro=${filtro.text}&` : '') + (filtro.nacionalidad !== undefined ? `nacionalidad=${filtro.nacionalidad}&` : '') +( filtro.facultad ? `facultad=${filtro.facultad}&`:'')+ (filtro.page ? `page=${filtro.page}&`:'') + (filtro.size ?`size=${filtro.size}`:'')  
    }
    return this.http.get(`http://localhost:8080/jugadores${this.params}`)
  }

  async borrarJugador(id: Number){
    this.http.delete(`http://localhost:8080/jugadores/${id}`).subscribe()
  }

  editarJugador(jugador:any):any {
    return this.http.put(`http://localhost:8080/jugadores`,jugador)
  }
}
