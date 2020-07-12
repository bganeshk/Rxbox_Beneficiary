import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrviewRoutingModule } from './drview-routing.module';

import { MessageService } from 'primeng/api';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { FileUploadModule } from 'primeng/fileupload';
import { DrviewComponent } from './drview/drview.component';
import { DrdashComponent } from './drdash/drdash.component';


const COMPONENTS = [
  DrviewComponent,DrdashComponent
];
const ENTRY_COMPONENTS = [

];
@NgModule({
  declarations: [...COMPONENTS,  ],
  providers: [MessageService],
  entryComponents:[...ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, DrviewRoutingModule,FileUploadModule
  ]
})

export class DrviewModule { }
