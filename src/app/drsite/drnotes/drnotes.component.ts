import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-drnotes',
  templateUrl: './drnotes.component.html',
  styleUrls: ['./drnotes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrnotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
