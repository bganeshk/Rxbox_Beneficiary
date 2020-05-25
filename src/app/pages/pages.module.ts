import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing/pages-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToggleButtonModule} from 'primeng/togglebutton';



const PAGES_COMPONENTS = [
  PagesComponent,
];

const PAGES_ENTRY_COMPONENTS = [

];


@NgModule({
  declarations: [...PAGES_COMPONENTS, PagesComponent, DashboardComponent],
  entryComponents: [...PAGES_ENTRY_COMPONENTS],
  imports: [
    PagesRoutingModule, GlobalComponentModule, NgxEchartsModule,TieredMenuModule,
    ToggleButtonModule
  ]
})
export class PagesModule { }
