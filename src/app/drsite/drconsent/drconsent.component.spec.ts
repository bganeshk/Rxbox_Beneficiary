import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrconsentComponent } from './drconsent.component';

describe('DrconsentComponent', () => {
  let component: DrconsentComponent;
  let fixture: ComponentFixture<DrconsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrconsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrconsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
