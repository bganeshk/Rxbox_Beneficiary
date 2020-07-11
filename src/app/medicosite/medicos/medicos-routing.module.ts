import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicosComponent } from './medicos.component';
import { MedidashComponent } from '../medidash/medidash.component';

const routes: Routes = [{ path: '', component: MedicosComponent ,
children :[
  {
    path: 'dash',      
    component: MedidashComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
