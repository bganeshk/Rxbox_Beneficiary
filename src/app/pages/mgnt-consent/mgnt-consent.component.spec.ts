import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntConsentComponent } from './mgnt-consent.component';

describe('MgntConsentComponent', () => {
  let component: MgntConsentComponent;
  let fixture: ComponentFixture<MgntConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
