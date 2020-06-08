import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEventsComponent } from './health-events.component';

describe('HealthEventsComponent', () => {
  let component: HealthEventsComponent;
  let fixture: ComponentFixture<HealthEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
