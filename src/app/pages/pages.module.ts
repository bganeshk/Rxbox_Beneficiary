import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing/pages-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { MgntConsentComponent, AssignConsentComponent } from './mgnt-consent/mgnt-consent.component';
import { MgntEhrComponent } from './mgnt-ehr/mgnt-ehr.component';
import { MgntNotifiComponent } from './mgnt-notifi/mgnt-notifi.component';
import { MgntReminderComponent } from './mgnt-reminder/mgnt-reminder.component';
import { MgntAppointComponent } from './mgnt-appoint/mgnt-appoint.component';
import { ConsentdetailsComponent } from './consentdetails/consentdetails.component';
import { MgntConsentreqComponent } from './mgnt-consentreq/mgnt-consentreq.component';
import { MgntTemplateComponent } from './mgnt-template/mgnt-template.component';
import { RxSharedModule } from '../global/share/share.module';



const PAGES_COMPONENTS = [
  PagesComponent, PagesComponent,  MgntConsentComponent, MgntEhrComponent, 
  MgntNotifiComponent, MgntReminderComponent, MgntAppointComponent,
  ConsentdetailsComponent, MgntConsentreqComponent, MgntTemplateComponent,AssignConsentComponent
];

const PAGES_ENTRY_COMPONENTS = [

];



@NgModule({
  providers:[DashboardComponent,],
  declarations: [...PAGES_COMPONENTS,],
  entryComponents: [...PAGES_ENTRY_COMPONENTS],
  imports: [
    PagesRoutingModule, GlobalComponentModule, TieredMenuModule,
    ToggleButtonModule,RxSharedModule,
  
  ]
})
export class PagesModule { }

