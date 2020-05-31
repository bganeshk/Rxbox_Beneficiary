import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntAppointComponent } from './mgnt-appoint.component';

describe('MgntAppointComponent', () => {
  let component: MgntAppointComponent;
  let fixture: ComponentFixture<MgntAppointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntAppointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
