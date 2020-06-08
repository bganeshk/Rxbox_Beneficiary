import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEhrComponent } from './lab-ehr.component';

describe('LabEhrComponent', () => {
  let component: LabEhrComponent;
  let fixture: ComponentFixture<LabEhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabEhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
