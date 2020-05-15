import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children :[
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
  ]
}];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
