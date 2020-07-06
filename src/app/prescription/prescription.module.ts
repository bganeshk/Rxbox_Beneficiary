import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescRoutingModule } from './presc-routing/presc-routing.module';
import { GlobalComponentModule } from 'src/app/global/global-component/global-component.module';
import { MgntPrescriptionComponent } from './mgnt-prescription/mgnt-prescription.component';
import { PrescFfmntComponent } from './presc-ffmnt/presc-ffmnt.component';
import { PrescHistoryComponent } from './presc-history/presc-history.component';
import { PrescComponent } from './presc/presc.component';


const PRESC_COMPONENTS = [
  MgntPrescriptionComponent ,PrescFfmntComponent,PrescComponent,PrescHistoryComponent, PrescComponent
]

const PRESC_ENTRY_COMPONENTS = [
 
];


@NgModule({
  declarations: [...PRESC_COMPONENTS, ],
  entryComponents: [...PRESC_ENTRY_COMPONENTS],
  imports: [
    PrescRoutingModule,GlobalComponentModule,
  ]
})
export class PrescriptionModule { }
