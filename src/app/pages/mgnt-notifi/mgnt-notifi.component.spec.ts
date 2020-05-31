import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntNotifiComponent } from './mgnt-notifi.component';

describe('MgntNotifiComponent', () => {
  let component: MgntNotifiComponent;
  let fixture: ComponentFixture<MgntNotifiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntNotifiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntNotifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
