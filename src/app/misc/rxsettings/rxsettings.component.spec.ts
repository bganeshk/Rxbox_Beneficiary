import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxsettingsComponent } from './rxsettings.component';

describe('RxsettingsComponent', () => {
  let component: RxsettingsComponent;
  let fixture: ComponentFixture<RxsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
