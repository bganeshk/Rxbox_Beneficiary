import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { MiscRoutingModule } from './misc-routing/misc-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { EhRoadmapComponent } from './eh-roadmap/eh-roadmap.component';
import { HealthEventsComponent } from './health-events/health-events.component';
import { ReminderComponent } from './reminder/reminder.component';


import { MessageService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import { RxsettingsComponent } from './rxsettings/rxsettings.component';
import { MiscComponent } from './misc/misc.component';
import { RxSharedModule } from '../global/share/share.module';

const MISC_COMPONENTS = [
  MiscComponent, AppointmentComponent,  ReminderComponent,
    
]

const MISC_ENTRY_COMPONENTS = [
  
];

@NgModule({
  declarations: [...MISC_COMPONENTS, RxsettingsComponent, MiscComponent],
  providers: [MessageService,EhRoadmapComponent, HealthEventsComponent,],
  entryComponents:[...MISC_ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, MiscRoutingModule,  CalendarModule, RxSharedModule
  ]
})
export class MiscModule { }
