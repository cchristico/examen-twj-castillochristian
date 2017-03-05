import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {JugadorComponent} from "./jugador/jugador.component";
import {EquipoComponent} from "./equipo/equipo.component";
import {HomeComponent} from "./home/home.component";
/**
 * Created by Christian on 04/03/2017.
 */
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'jugador', component: JugadorComponent },
  {path:'equipo',component: EquipoComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
