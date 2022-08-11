import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  //a esta url vamos a hacer las llamadas
  url : String = 'http://localhost:8080'
  params : String = ''
  constructor(private http : HttpClient) { 
    
  }

  async guardarJugador(jugador : any,url = this.url) : Promise<any> {
    console.log('aca')
    const rta = this.http.post(`http://localhost:8080/jugadores`, jugador)
    rta.subscribe()
    // const rta = await axios.post(`${url}/jugadores`, jugador)
    console.log(rta)
  }
  getJugador(id:any):any{
    console.log('acasasas')
    return this.http.get(`http://localhost:8080/jugadores/${id}`)
  }
  getJugadores(filtro?:any){
    if(filtro){
      this.params = `?` +( filtro.text !== undefined ? `filtro=${filtro.text}&` : '') + (filtro.nacionalidad !== undefined ? `nacionalidad=${filtro.nacionalidad}&` : '') +( filtro.facultad ? `facultad=${filtro.facultad}&`:'')+ (filtro.page ? `page=${filtro.page}&`:'') + (filtro.size ?`size=${filtro.size}`:'')  
    }
    console.log(filtro, this.params)
    return this.http.get(`http://localhost:8080/jugadores${this.params}`)
  }

  async borrarJugador(id: Number){
    this.http.delete(`http://localhost:8080/jugadores/${id}`).subscribe()
  }

  async editarJugador(jugador:any):Promise<any> {
    this.http.put(`http://localhost:8080/jugadores`,jugador).subscribe()
  }
}
