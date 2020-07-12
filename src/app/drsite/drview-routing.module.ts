import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrviewComponent } from './drview/drview.component';
import { DrdashComponent } from './drdash/drdash.component';



const routes: Routes = [{ path: '', component: DrviewComponent, 
children :[
  {
    path: 'dash',      
    component: DrdashComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrviewRoutingModule { }
