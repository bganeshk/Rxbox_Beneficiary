import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrviewComponent } from './drview.component';

describe('DrviewComponent', () => {
  let component: DrviewComponent;
  let fixture: ComponentFixture<DrviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
