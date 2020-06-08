import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentdetailsComponent } from './consentdetails.component';

describe('ConsentdetailsComponent', () => {
  let component: ConsentdetailsComponent;
  let fixture: ComponentFixture<ConsentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
