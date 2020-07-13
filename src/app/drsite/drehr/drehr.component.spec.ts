import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrehrComponent } from './drehr.component';

describe('DrehrComponent', () => {
  let component: DrehrComponent;
  let fixture: ComponentFixture<DrehrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrehrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrehrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
