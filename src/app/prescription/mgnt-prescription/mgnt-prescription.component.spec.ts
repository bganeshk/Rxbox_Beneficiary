import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntPrescriptionComponent } from './mgnt-prescription.component';

describe('MgntPrescriptionComponent', () => {
  let component: MgntPrescriptionComponent;
  let fixture: ComponentFixture<MgntPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
