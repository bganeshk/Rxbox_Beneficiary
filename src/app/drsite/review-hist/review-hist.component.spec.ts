import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHistComponent } from './review-hist.component';

describe('ReviewHistComponent', () => {
  let component: ReviewHistComponent;
  let fixture: ComponentFixture<ReviewHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
