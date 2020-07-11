import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from 'src/app/global/global-component/global-component.module';
import { MedidashComponent } from '../medidash/medidash.component';

const COMPONENTS = [
  MedicosComponent,MedidashComponent
];
const ENTRY_COMPONENTS = [

]

@NgModule({
  declarations: [...COMPONENTS, ],
  providers: [MessageService],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, MedicosRoutingModule
  ]
 
})
export class MedicosModule { }
