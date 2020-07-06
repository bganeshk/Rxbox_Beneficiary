import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescComponent } from './presc.component';

describe('PrescComponent', () => {
  let component: PrescComponent;
  let fixture: ComponentFixture<PrescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
