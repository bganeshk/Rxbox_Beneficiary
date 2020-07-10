import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

import { MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/angular'; 

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements AfterViewInit, OnInit {

  @ViewChild('fc', { static: false }) fc: FullCalendar
  events: any[];
  selectEvent: any;
  options: any;
  showDlg: boolean = false;
  newEvent = false;


  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit() {

    this.events = [{
      "id": 1,
      "title": "All Day Event",
      "desc": " Need to get the appointmetn sms befor starting the faljsfa;sdjf;asd f;asdf",
      "start": "2020-07-10"
    },
    {
      "id": 2,
      "title": "Meeting",
      "desc": " Need to get the appointmetn sms befor starting the faljsfa;sdjf;asd f;asdf",
      "start": "2020-07-11T10:30:00",
      "end": "2020-07-11T12:30:00"
    }];
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      select: this.createEvent.bind(this),
      eventClick: this.mngeEvent.bind(this),
      selectable: true,
      editable: true,
      height:'70vh',
      width:'75vw',
      defaultDate: '2017-02-01',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }
    }
  }

  createEvent(info) {
    this.showDlg = true;
    console.debug(info);
    this.selectEvent = {"id": 3,"start":info.start,"end":info.end,"title":'',allDay:info.allDay,
     extendedProps:{desc:''}};
    this.newEvent=true;
  }

  mngeEvent(info) {
    this.showDlg = true;
    this.newEvent=false;
    this.selectEvent = info.event;
  }

  save() {    
    this.events.push(this.selectEvent);
    this.events = [...this.events];
    this.showDlg = false;
    this.newEvent=false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Appointment Created', detail: 'Appointment has been created successfully' });
  }

  delete() {
    let delEvent;
    this.fc.events.forEach(e => {
      if (e.id == this.selectEvent.id) {
        delEvent = e;
      }
    });
    this.events.splice(this.events.indexOf(delEvent), 1);
    this.events = [...this.events];
    this.showDlg = false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Appointment Deleted', detail: 'Appointment has been deleted successfully' });
  }
}
