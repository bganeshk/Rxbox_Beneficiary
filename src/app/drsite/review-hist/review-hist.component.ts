import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-review-hist',
  templateUrl: './review-hist.component.html',
  styleUrls: ['./review-hist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewHistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
