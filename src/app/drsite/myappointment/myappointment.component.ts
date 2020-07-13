import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-myappointment',
  templateUrl: './myappointment.component.html',
  styleUrls: ['./myappointment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyappointmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
