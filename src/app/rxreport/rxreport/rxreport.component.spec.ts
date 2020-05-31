import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxreportComponent } from './rxreport.component';

describe('RxreportComponent', () => {
  let component: RxreportComponent;
  let fixture: ComponentFixture<RxreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
