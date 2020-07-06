import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MgntEhrComponent } from '../mgnt-ehr/mgnt-ehr.component';
import { LabEhrComponent } from '../lab-ehr/lab-ehr.component';
import { MgntDiaganosisComponent } from '../mgnt-diaganosis/mgnt-diaganosis.component';
import { FmlyEhrComponent } from '../fmly-ehr/fmly-ehr.component';
import { SmryEhrComponent } from '../smry-ehr/smry-ehr.component';
import { OtherDocComponent } from '../other-doc/other-doc.component';
import { EhrComponent } from '../ehr/ehr.component';

//mgntdiarec , lab family smrrec otrdoc 

const routes: Routes = [{
  path: '',
  component: EhrComponent,
  children :[
    {
      path: '',
      component: MgntEhrComponent
    },
    {
      path: 'lab',
      component: LabEhrComponent
    },
    {
      path: 'mgntdiarec',
      component: MgntDiaganosisComponent
    },
    {
      path: 'family',
      component: FmlyEhrComponent
    },
    {
      path: 'smrrec',
      component: SmryEhrComponent
    },
    {
      path: 'otrdoc',
      component: OtherDocComponent
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
export class EhrRoutingModule { }
