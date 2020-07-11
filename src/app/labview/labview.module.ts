import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabviewRoutingModule } from './labview-routing.module';
import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabviewComponent } from './labview/labview.component';

const COMPONENTS = [
  DashboardComponent, LabviewComponent
];
const ENTRY_COMPONENTS = [

];
@NgModule({
  declarations: [...COMPONENTS, ],
  providers: [MessageService],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, LabviewRoutingModule
  ]
})
export class LabviewModule { }
