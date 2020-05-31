import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RxreportComponent } from './rxreport/rxreport.component';


const routes: Routes = [{
  path: '',
  component: null,
  children :[
    {
      path: '',
      component: RxreportComponent
    }
  ]
}];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ReportsRoutingModule { }
