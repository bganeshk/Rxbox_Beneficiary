import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntEhrComponent } from './mgnt-ehr.component';

describe('MgntEhrComponent', () => {
  let component: MgntEhrComponent;
  let fixture: ComponentFixture<MgntEhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntEhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
