import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabviewRoutingModule } from './labview-routing.module';
import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LabviewComponent } from './labview/labview.component';
import {FileUploadModule} from 'primeng/fileupload';
import { CustomerSerachComponent } from '../global/customer-serach/customer-serach.component';
import { ShareModule } from '../global/share/share.module';


const COMPONENTS = [
  DashboardComponent, LabviewComponent,
];
const ENTRY_COMPONENTS = [

];
@NgModule({
  declarations: [...COMPONENTS, ],
  providers: [MessageService,CustomerSerachComponent],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, LabviewRoutingModule,FileUploadModule,ShareModule
  ]
})
export class LabviewModule { }
