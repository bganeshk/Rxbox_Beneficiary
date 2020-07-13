import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrviewRoutingModule } from './drview-routing.module';

import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { FileUploadModule } from 'primeng/fileupload';
import { DrviewComponent } from './drview/drview.component';
import { DrdashComponent } from './drdash/drdash.component';
import { CustomerSerachComponent } from '../global/customer-serach/customer-serach.component';
import { ShareModule } from '../global/share/share.module';
import {TabMenuModule} from 'primeng/tabmenu';
import { ReviewHistComponent } from './review-hist/review-hist.component';
import { DrconsentComponent } from './drconsent/drconsent.component';
import { DrehrComponent } from './drehr/drehr.component';
import { DrnotesComponent } from './drnotes/drnotes.component';
import { MyappointmentComponent } from './myappointment/myappointment.component';

const COMPONENTS = [
  DrviewComponent,DrdashComponent,ReviewHistComponent, DrconsentComponent, DrehrComponent, DrnotesComponent, MyappointmentComponent,
];
const ENTRY_COMPONENTS = [
  
];
@NgModule({
  declarations: [...COMPONENTS,  ],
  providers: [MessageService,CustomerSerachComponent],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, DrviewRoutingModule,FileUploadModule,ShareModule,TabMenuModule
  ]
})

export class DrviewModule { }
