import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgntPrescriptionComponent } from '../mgnt-prescription/mgnt-prescription.component';
import { Routes, RouterModule } from '@angular/router';
import { PrescFfmntComponent } from '../presc-ffmnt/presc-ffmnt.component';

const routes: Routes = [{
  path: '',
  component: null,
  children :[
    {
      path: '',
      component: MgntPrescriptionComponent
    },
    {
      path: 'ffmnt',
      component: PrescFfmntComponent
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
export class PrescRoutingModule { 

}