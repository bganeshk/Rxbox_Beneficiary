import { NgModule } from '@angular/core';
import { EhrRoutingModule } from './ehr-routing/ehr-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { MgntEhrComponent } from './mgnt-ehr/mgnt-ehr.component';
import { LabEhrComponent } from './lab-ehr/lab-ehr.component';
import { FmlyEhrComponent } from './fmly-ehr/fmly-ehr.component';
import { SmryEhrComponent } from './smry-ehr/smry-ehr.component';
import { OtherDocComponent } from './other-doc/other-doc.component';
import { MgntDiaganosisComponent } from './mgnt-diaganosis/mgnt-diaganosis.component';
import { MessageService } from 'primeng/api';
import { EhrComponent } from './ehr/ehr.component';
import { ShareModule } from '../global/share/share.module';

const EHR_COMPONENTS = [
  MgntEhrComponent, LabEhrComponent, FmlyEhrComponent, 
    MgntDiaganosisComponent,EhrComponent
]

const EHR_ENTRY_COMPONENTS = [
  
];


@NgModule({
  declarations: [...EHR_COMPONENTS,  ],
  entryComponents: [...EHR_ENTRY_COMPONENTS],
  providers: [MessageService,SmryEhrComponent,OtherDocComponent],
  imports: [
    EhrRoutingModule, GlobalComponentModule, ShareModule
  ]
})
export class EHRModule { }
