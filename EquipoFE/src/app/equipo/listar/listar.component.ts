import { Component, OnInit } from '@angular/core';
import {MasterURLService} from "../../services/master-url.service";
import {Http, Response} from "@angular/http";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
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
  private devices: string[];
  private selectedDevice: string;
  onChange(newValue) {
    this.devices = 'one two three'.split(' ');
    this.selectedDevice = 'two';
    this._http.get(this._masterURL.url + "Jugador?idEquipo="+newValue)
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
//    console.log(newValue);
    this.selectedDevice = newValue;
    // ... do other stuff here ...
  }
  title:string="Nomina de jugadores según Equipo";
  jugadores = [];
  equipos= [];
  constructor(private _http:Http,
  private _masterURL:MasterURLService) { }

  ngOnInit() {
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

}
