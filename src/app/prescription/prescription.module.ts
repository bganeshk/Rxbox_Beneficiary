import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescRoutingModule } from './presc-routing/presc-routing.module';
import { GlobalComponentModule } from 'src/app/global/global-component/global-component.module';
import { MgntPrescriptionComponent } from './mgnt-prescription/mgnt-prescription.component';
import { PrescFfmntComponent } from './presc-ffmnt/presc-ffmnt.component';
import { PrescHistoryComponent } from './presc-history/presc-history.component';
import { PrescComponent } from './presc/presc.component';
import { RxSharedModule } from '../global/share/share.module';


const PRESC_COMPONENTS = [
  PrescFfmntComponent,PrescComponent,PrescHistoryComponent
]

const PRESC_ENTRY_COMPONENTS = [
 
];


@NgModule({
  providers:[MgntPrescriptionComponent ],
  declarations: [...PRESC_COMPONENTS, ],
  entryComponents: [...PRESC_ENTRY_COMPONENTS],
  imports: [
    PrescRoutingModule,GlobalComponentModule,RxSharedModule
  ]
})
export class PrescriptionModule { }
