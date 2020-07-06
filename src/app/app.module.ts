import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import {environment} from '../environments/environment';
import { APP_BASE_HREF} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { GlobalComponentModule} from './global/global-component/global-component.module';
import { GlobalErrorHandler, GlobalBeeService } from 'bee-lib';
import { BeeHttpInterceptorService } from 'bee-lib';
import { PrescriptionModule } from './prescription/prescription.module';
import { MiscModule } from './misc/misc.module';
import { EHRModule } from './ehr/ehr.module';
import { PagesModule } from './pages/pages.module';
import { ProfileModule } from './profile/profile.module';


const IMPORT_MODULE = [
  QRCodeModule
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserloginComponent,
    
  ],
  
  imports: [
    PrescriptionModule,
    PagesModule,
    MiscModule,
    EHRModule,
    ProfileModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GlobalComponentModule,    
    HttpClientModule, ...IMPORT_MODULE
  ],
  providers: [
    GlobalBeeService,
    {provide: 'environment', useValue: environment},
    { provide: APP_BASE_HREF, useValue: '/' },
    //{ provide: ErrorHandler,  useClass: GlobalErrorHandler },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: BeeHttpInterceptorService,
      multi: true
    }*/

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
