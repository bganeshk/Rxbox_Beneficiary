import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { MiscRoutingModule } from './misc-routing/misc-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { EhRoadmapComponent } from './eh-roadmap/eh-roadmap.component';
import { HealthEventsComponent } from './health-events/health-events.component';
import { ReminderComponent } from './reminder/reminder.component';


const MISC_COMPONENTS = [
    AppointmentComponent, EhRoadmapComponent, HealthEventsComponent, ReminderComponent,
    
]

const MISC_ENTRY_COMPONENTS = [

];

@NgModule({
  declarations: [...MISC_COMPONENTS],
  entryComponents:[...MISC_ENTRY_COMPONENTS],
  imports: [
    GlobalComponentModule, MiscRoutingModule
  ]
})
export class MiscModule { }
