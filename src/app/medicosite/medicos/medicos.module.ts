import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from 'src/app/global/global-component/global-component.module';
import { MedidashComponent } from '../medidash/medidash.component';
import { RxSharedModule } from 'src/app/global/share/share.module';
import { CustomerSerachComponent } from 'src/app/global/customer-serach/customer-serach.component';

const COMPONENTS = [
  MedicosComponent,MedidashComponent
];
const ENTRY_COMPONENTS = [

]

@NgModule({
  declarations: [...COMPONENTS, ],
  providers: [MessageService,CustomerSerachComponent],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, MedicosRoutingModule,RxSharedModule
  ]
 
})
export class MedicosModule { }
