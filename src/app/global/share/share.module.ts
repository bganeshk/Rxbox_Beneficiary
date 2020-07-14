import { NgModule } from '@angular/core';
import { CustomerSerachComponent } from '../customer-serach/customer-serach.component';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SmryEhrComponent } from 'src/app/ehr/smry-ehr/smry-ehr.component';
import { OtherDocComponent } from 'src/app/ehr/other-doc/other-doc.component';
import { EhRoadmapComponent } from 'src/app/misc/eh-roadmap/eh-roadmap.component';
import { HealthEventsComponent } from 'src/app/misc/health-events/health-events.component';


const DECLARE_COMPO=[
  CustomerSerachComponent,SmryEhrComponent,OtherDocComponent,
  EhRoadmapComponent, HealthEventsComponent,
]

@NgModule({
  declarations: [...DECLARE_COMPO,],
  providers: [MessageService],
  imports:[CommonModule, GlobalComponentModule],
  exports: [
    ...DECLARE_COMPO,
  ]
})
export class ShareModule { }
