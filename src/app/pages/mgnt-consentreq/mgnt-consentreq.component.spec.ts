import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntConsentreqComponent } from './mgnt-consentreq.component';

describe('MgntConsentreqComponent', () => {
  let component: MgntConsentreqComponent;
  let fixture: ComponentFixture<MgntConsentreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntConsentreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntConsentreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
