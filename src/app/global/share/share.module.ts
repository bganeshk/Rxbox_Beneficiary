import { NgModule } from '@angular/core';
import { CustomerSerachComponent } from '../customer-serach/customer-serach.component';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SmryEhrComponent } from 'src/app/ehr/smry-ehr/smry-ehr.component';
import { OtherDocComponent } from 'src/app/ehr/other-doc/other-doc.component';
import { EhRoadmapComponent } from 'src/app/misc/eh-roadmap/eh-roadmap.component';
import { HealthEventsComponent } from 'src/app/misc/health-events/health-events.component';
import { MgntPrescriptionComponent } from 'src/app/prescription/mgnt-prescription/mgnt-prescription.component';
import { LabEhrComponent } from 'src/app/ehr/lab-ehr/lab-ehr.component';
import { FmlyEhrComponent } from 'src/app/ehr/fmly-ehr/fmly-ehr.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

const DECLARE_COMPO=[
  CustomerSerachComponent,SmryEhrComponent,OtherDocComponent,
  EhRoadmapComponent, HealthEventsComponent, MgntPrescriptionComponent,
  LabEhrComponent,FmlyEhrComponent,DashboardComponent
]

@NgModule({
  declarations: [...DECLARE_COMPO,],
  providers: [MessageService],
  imports:[CommonModule, GlobalComponentModule,NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  exports: [
    ...DECLARE_COMPO,
  ]
})
export class RxSharedModule { }
