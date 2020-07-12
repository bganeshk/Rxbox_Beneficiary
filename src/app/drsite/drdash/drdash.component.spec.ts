import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrdashComponent } from './drdash.component';

describe('DrdashComponent', () => {
  let component: DrdashComponent;
  let fixture: ComponentFixture<DrdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
