import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrviewRoutingModule } from './drview-routing.module';

import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { FileUploadModule } from 'primeng/fileupload';
import { DrviewComponent } from './drview/drview.component';
import { DrdashComponent } from './drdash/drdash.component';
import { CustomerSerachComponent } from '../global/customer-serach/customer-serach.component';
import { RxSharedModule } from '../global/share/share.module';
import {TabMenuModule} from 'primeng/tabmenu';
import { DrconsentComponent } from './drconsent/drconsent.component';
import { DrehrComponent } from './drehr/drehr.component';
import { DrnotesComponent } from './drnotes/drnotes.component';
import { MyappointmentComponent } from './myappointment/myappointment.component';
import { DrhomeComponent } from './drhome/drhome.component';
import { SmryEhrComponent } from '../ehr/smry-ehr/smry-ehr.component';
import { OtherDocComponent } from '../ehr/other-doc/other-doc.component';
import { EhRoadmapComponent } from '../misc/eh-roadmap/eh-roadmap.component';
import { HealthEventsComponent } from '../misc/health-events/health-events.component';
import { MgntPrescriptionComponent } from '../prescription/mgnt-prescription/mgnt-prescription.component';
import { LabEhrComponent } from '../ehr/lab-ehr/lab-ehr.component';
import { FmlyEhrComponent } from '../ehr/fmly-ehr/fmly-ehr.component';
import { PrescriptionService } from 'rx-lib';




const COMPONENTS = [
  DrviewComponent,DrdashComponent, DrhomeComponent, DrconsentComponent, DrehrComponent, 
  DrnotesComponent, MyappointmentComponent,
];
const ENTRY_COMPONENTS = [
  
];
const PORVIDED_COMPONENET=[
  CustomerSerachComponent,SmryEhrComponent,OtherDocComponent,EhRoadmapComponent, HealthEventsComponent,
  MgntPrescriptionComponent,LabEhrComponent,FmlyEhrComponent,
]
@NgModule({
  declarations: [...COMPONENTS,   ],
  providers: [...PORVIDED_COMPONENET,MessageService,PrescriptionService],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, DrviewRoutingModule,FileUploadModule,RxSharedModule,TabMenuModule
  ]
})

export class DrviewModule { }
