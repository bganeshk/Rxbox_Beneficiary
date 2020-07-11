import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabviewComponent } from './labview/labview.component';



const routes: Routes = [{
  path: '',
  component: LabviewComponent,
  children :[
    {
      path: 'dash',      
      component: DashboardComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabviewRoutingModule { }
