import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmlyEhrComponent } from './fmly-ehr.component';

describe('FmlyEhrComponent', () => {
  let component: FmlyEhrComponent;
  let fixture: ComponentFixture<FmlyEhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmlyEhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmlyEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
