import {Component, OnInit} from '@angular/core';
import {MasterURLService} from "../services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  title: string = "Federacón Deportiva Cebollitas F.D.C.";
  subtitle: string="Listado de Equipos"
 nuevoEquipo= {};
  equipos = [];
  disabledButtons = {
    NuevoEquipoFormSumitButton: false
  };


  constructor(private _http: Http,
              private  _masterURL: MasterURLService) {
  }

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
      )
  }

  crearEquipo(formulario: NgForm) {
    console.log("No se que va a imprimir: esperemso al body");
    console.log(formulario);
    this.disabledButtons.NuevoEquipoFormSumitButton = true;
    this._http.post(this._masterURL.url + "Equipo", {
      nombre: formulario.value.nombre,
      fechaCreacion: formulario.value.fechaCreacion,
      lugarRecidencia: formulario.value.lugarRecidencia
    }).subscribe(
      (res) => {
        console.log("No existieron errores");
        console.log(res);
        this.equipos.push(res.json());
        this.nuevoEquipo = {};
        this.disabledButtons.NuevoEquipoFormSumitButton = false;
      },
      (err) => {
        this.disabledButtons.NuevoEquipoFormSumitButton = false;
        console.log("Ocurrio un error", err);
      },
      () => {
        console.log("Se ejecuto a función")
      }
    );
  }
  borrarEquipo(id:number){
    this._http.delete(this._masterURL.url+'Equipo/'+id).subscribe(
      (res)=>{
        let grupoBorrado=res.json();
        this.equipos=this.equipos.filter(value=>grupoBorrado.id!=value.id);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  actualizarEquipo(equipo:any, id:number){
    let parametros={
      nombre:equipo.nombre,
      fechaCreacion: equipo.fechaCreacion,
      lugarRecidencia: equipo.lugarRecidencia

    };
    this._http.put(this._masterURL.url+"Equipo/"+id,parametros).subscribe(
      (res:Response)=>{
        equipo.formularioCerrado=!equipo.formularioCerrado;
        console.log("Respuesta:",res.json());
      },
      (err) => {
        console.log("Error: ", err);
      }
    );
  }
}
