import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntDiaganosisComponent } from './mgnt-diaganosis.component';

describe('MgntDiaganosisComponent', () => {
  let component: MgntDiaganosisComponent;
  let fixture: ComponentFixture<MgntDiaganosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntDiaganosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntDiaganosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
