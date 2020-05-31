import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing/pages-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { MgntConsentComponent } from './mgnt-consent/mgnt-consent.component';
import { MgntEhrComponent } from './mgnt-ehr/mgnt-ehr.component';
import { MgntNotifiComponent } from './mgnt-notifi/mgnt-notifi.component';
import { MgntReminderComponent } from './mgnt-reminder/mgnt-reminder.component';
import { MgntAppointComponent } from './mgnt-appoint/mgnt-appoint.component';



const PAGES_COMPONENTS = [
  PagesComponent, PagesComponent, DashboardComponent, MgntConsentComponent, MgntEhrComponent, 
  MgntNotifiComponent, MgntReminderComponent, MgntAppointComponent

];

const PAGES_ENTRY_COMPONENTS = [

];


@NgModule({
  declarations: [...PAGES_COMPONENTS],
  entryComponents: [...PAGES_ENTRY_COMPONENTS],
  imports: [
    PagesRoutingModule, GlobalComponentModule, NgxEchartsModule,TieredMenuModule,
    ToggleButtonModule
  ]
})
export class PagesModule { }
