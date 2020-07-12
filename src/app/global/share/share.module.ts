import { NgModule } from '@angular/core';
import { CustomerSerachComponent } from '../customer-serach/customer-serach.component';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CustomerSerachComponent],
  providers: [MessageService],
  imports:[CommonModule, GlobalComponentModule],
  exports: [
    CustomerSerachComponent
  ]
})
export class ShareModule { }
