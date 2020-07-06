import { NgModule } from '@angular/core';
import { EhrRoutingModule } from './ehr-routing/ehr-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { MgntEhrComponent } from './mgnt-ehr/mgnt-ehr.component';
import { LabEhrComponent } from './lab-ehr/lab-ehr.component';
import { FmlyEhrComponent } from './fmly-ehr/fmly-ehr.component';
import { SmryEhrComponent } from './smry-ehr/smry-ehr.component';
import { OtherDocComponent } from './other-doc/other-doc.component';
import { MgntDiaganosisComponent } from './mgnt-diaganosis/mgnt-diaganosis.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import {TreeModule} from 'primeng/tree';
import { EhrComponent } from './ehr/ehr.component';

const EHR_COMPONENTS = [
  MgntEhrComponent, LabEhrComponent, FmlyEhrComponent, 
  SmryEhrComponent, OtherDocComponent, MgntDiaganosisComponent,EhrComponent
]

const EHR_ENTRY_COMPONENTS = [
  
];


@NgModule({
  declarations: [...EHR_COMPONENTS,  ],
  entryComponents: [...EHR_ENTRY_COMPONENTS],
  providers: [MessageService],
  imports: [
    EhrRoutingModule, GlobalComponentModule,TieredMenuModule,
    FileUploadModule,TreeModule
  ]
})
export class EHRModule { }
