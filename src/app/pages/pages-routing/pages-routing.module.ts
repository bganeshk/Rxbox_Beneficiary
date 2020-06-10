import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MgntEhrComponent } from '../mgnt-ehr/mgnt-ehr.component';
import { MgntConsentComponent, AssignConsentComponent } from '../mgnt-consent/mgnt-consent.component';
import { MgntNotifiComponent } from '../mgnt-notifi/mgnt-notifi.component';
import { MgntReminderComponent } from '../mgnt-reminder/mgnt-reminder.component';
import { MgntAppointComponent } from '../mgnt-appoint/mgnt-appoint.component';
import { ConsentdetailsComponent } from '../consentdetails/consentdetails.component';
import { MgntConsentreqComponent } from '../mgnt-consentreq/mgnt-consentreq.component';
import { MgntTemplateComponent } from '../mgnt-template/mgnt-template.component';


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
      path: 'assignConsent',
      component: AssignConsentComponent
    },{
      path: 'activeConsentdetails',      
      component: ConsentdetailsComponent,
      data:{status:'active'}
    },{
      path: 'expConsentdetails',      
      component: ConsentdetailsComponent,
      data:{status:'expired'}
    },{
      path: 'mgntconsentsreq',
      component: MgntConsentreqComponent
    },{
      path: 'mgnttemplate',
      component: MgntTemplateComponent
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
