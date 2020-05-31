import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntReminderComponent } from './mgnt-reminder.component';

describe('MgntReminderComponent', () => {
  let component: MgntReminderComponent;
  let fixture: ComponentFixture<MgntReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
