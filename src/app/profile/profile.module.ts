import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { TabMenuModule} from 'primeng/tabmenu';
import { AddressComponent } from './address/address.component';
import { PrfnamedetComponent } from './prfnamedet/prfnamedet.component';
import { PrfpasswdComponent } from './prfpasswd/prfpasswd.component';
import { PymntComponent } from './pymnt/pymnt.component';
import { SupportComponent } from './social/social.component';
import { ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import { GlobalComponentModule } from '../global/global-component/global-component.module';

const PAGES_COMPONENTS = [ProfileComponent];

@NgModule({
  declarations: [...PAGES_COMPONENTS, AddressComponent, PrfnamedetComponent, PrfpasswdComponent, PymntComponent, SupportComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TabMenuModule,
     FormsModule,
    
    ReactiveFormsModule,
    PasswordModule,
    GlobalComponentModule
  ]
  
})
export class ProfileModule {



}
