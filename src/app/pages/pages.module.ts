import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing/pages-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';

const PAGES_COMPONENTS = [
  PagesComponent,
];

const PAGES_ENTRY_COMPONENTS = [

];


@NgModule({
  declarations: [...PAGES_COMPONENTS, PagesComponent, DashboardComponent],
  entryComponents: [...PAGES_ENTRY_COMPONENTS],
  imports: [
    PagesRoutingModule, GlobalComponentModule, NgxEchartsModule
  ]
})
export class PagesModule { }
