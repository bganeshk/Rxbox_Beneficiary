import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children :[
    {
      path: '',
      component: PagesComponent
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
export class PagesRoutingModule { }
