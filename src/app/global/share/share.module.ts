import { NgModule } from '@angular/core';
import { CustomerSerachComponent } from '../customer-serach/customer-serach.component';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SmryEhrComponent } from 'src/app/ehr/smry-ehr/smry-ehr.component';



@NgModule({
  declarations: [CustomerSerachComponent,SmryEhrComponent],
  providers: [MessageService],
  imports:[CommonModule, GlobalComponentModule],
  exports: [
    CustomerSerachComponent,SmryEhrComponent
  ]
})
export class ShareModule { }
