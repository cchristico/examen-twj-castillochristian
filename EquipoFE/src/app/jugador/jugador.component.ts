import { Component, OnInit } from '@angular/core';
import {Response, Http} from "@angular/http";
import {NgForm} from "@angular/forms";
import {MasterURLService} from "../services/master-url.service";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  title: string = "Federacón Deportiva Cebollitas F.D.C.";
  subtitle: string="Listado de jugadores";
  nuevoJugador= {};
  jugadores = [];
  posiciones=[{posicion:"Arquero"},
    {posicion:"Defensor Central"},
    {posicion:"Defensor lateral"},
    {posicion:"Carrilero"},
    {posicion:"Defensor de medio campo"},
    {posicion:"Mediocampista defensivo"},
    {posicion:"Mediocampista Central"},
    {posicion:"Mediocampista externo"},
    {posicion:"Mediocampista ofensivo"},
    {posicion:"Lateral volante"},
    {posicion:"Volante de contención"},
    {posicion:"Volante de corte"},
    {posicion:"Volante de salida"},
    {posicion:"Volante por la banda"},
    {posicion:"Volante mixto"},
    {posicion:"Volante de enganche lateral"},
    {posicion:"Volante de creación"},
    {posicion:"Volante con llegada"},
    {posicion:"Media punta derecha"},
    {posicion:"Segundo delantero izquierdo"},
    {posicion:"Centro punta grueso"},
    {posicion:"Puntero"},
    {posicion:"Extremo lateral"},
    {posicion:"Delantero centro"}];
  equipos= [];
  disabledButtons = {
    nuevoJugadorFormSumitButton: false
};

  constructor(private _http: Http,
              private  _masterURL: MasterURLService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Jugador")
      .subscribe(
        (res: Response) => {
          this.jugadores = res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      );
    this._http.get(this._masterURL.url + "Equipo")
      .subscribe(
        (res: Response) => {
          this.equipos = res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  crearJugador(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.nuevoJugadorFormSumitButton = true;
    this._http.post(this._masterURL.url + "Jugador", {
      nombre: formulario.value.nombre,
      fichadoHasta: formulario.value.fichadoHasta,
      posicion: formulario.value.posicion,
      idEquipo: formulario.value.idEquipo
    }).subscribe(
      (res) => {
        console.log("No existieron errores");
        console.log(res);
        this.jugadores.push(res.json());
        this.nuevoJugador = {};
        this.disabledButtons.nuevoJugadorFormSumitButton = false;
      },
      (err) => {
        this.disabledButtons.nuevoJugadorFormSumitButton = false;
        console.log("Ocurrio un error", err);
      },
      () => {
        console.log("Se ejecuto a función")
      }
    );
  }
  borrarJugador(id:number){
    this._http.delete(this._masterURL.url+'Jugador/'+id).subscribe(
      (res)=>{
        let grupoBorrado=res.json();
        this.jugadores=this.jugadores.filter(value=>grupoBorrado.id!=value.id);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  actualizarJugador(Jugador:any, id:number){
    let parametros={
      nombre:Jugador.nombre,
      fichadoHasta: Jugador.fichadoHasta,
      posicion: Jugador.posicion

    };
    this._http.put(this._masterURL.url+"Jugador/"+id,parametros).subscribe(
      (res:Response)=>{
        Jugador.formularioCerrado=!Jugador.formularioCerrado;
        console.log("Respuesta:",res.json());
      },
      (err) => {
        console.log("Error: ", err);
      }
    );
  }
}
