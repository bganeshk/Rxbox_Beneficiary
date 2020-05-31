import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MgntEhrComponent } from '../mgnt-ehr/mgnt-ehr.component';
import { MgntConsentComponent } from '../mgnt-consent/mgnt-consent.component';
import { MgntNotifiComponent } from '../mgnt-notifi/mgnt-notifi.component';
import { MgntReminderComponent } from '../mgnt-reminder/mgnt-reminder.component';
import { MgntAppointComponent } from '../mgnt-appoint/mgnt-appoint.component';


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
    },{
      path: 'mgntConsent',
      component: MgntConsentComponent
    },{
      path: 'mgntEHR',
      component: MgntEhrComponent
    },{
      path: 'mgntNotification',
      component: MgntNotifiComponent
    },{
      path: 'appointmnt',
      component: MgntAppointComponent
    },{
      path: 'reminder',
      component: MgntReminderComponent
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
