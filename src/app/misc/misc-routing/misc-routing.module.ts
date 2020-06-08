import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../appointment/appointment.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { HealthEventsComponent } from '../health-events/health-events.component';
import { EhRoadmapComponent } from '../eh-roadmap/eh-roadmap.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: null,
  children :[
    {
      path: '',
      component: AppointmentComponent
    },
    {
      path: 'reminder',
      component: ReminderComponent
    },
    {
      path: 'ehevnt',
      component: HealthEventsComponent
    },
    {
      path: 'ehrmap',
      component: EhRoadmapComponent
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MiscRoutingModule { }
