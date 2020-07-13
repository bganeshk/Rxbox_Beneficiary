import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrnotesComponent } from './drnotes.component';

describe('DrnotesComponent', () => {
  let component: DrnotesComponent;
  let fixture: ComponentFixture<DrnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
