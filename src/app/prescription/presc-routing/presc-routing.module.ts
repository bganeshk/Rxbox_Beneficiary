import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgntPrescriptionComponent } from '../mgnt-prescription/mgnt-prescription.component';
import { Routes, RouterModule } from '@angular/router';
import { PrescFfmntComponent } from '../presc-ffmnt/presc-ffmnt.component';
import { PrescHistoryComponent } from '../presc-history/presc-history.component';
import { PrescComponent } from '../presc/presc.component';
const routes: Routes = [

  {
  path: '',
  component: PrescComponent,  
  children :[
    {
      path: 'mgmntpres',
      component: MgntPrescriptionComponent
    },
    {
      path: 'ffmnt',
      component: PrescFfmntComponent
    },
    {
      path: 'prhs',
      component: PrescHistoryComponent
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
