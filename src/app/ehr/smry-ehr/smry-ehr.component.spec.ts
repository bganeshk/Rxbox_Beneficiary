import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmryEhrComponent } from './smry-ehr.component';

describe('SmryEhrComponent', () => {
  let component: SmryEhrComponent;
  let fixture: ComponentFixture<SmryEhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmryEhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmryEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
