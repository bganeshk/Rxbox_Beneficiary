import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescHistoryComponent } from './presc-history.component';

describe('PrescHistoryComponent', () => {
  let component: PrescHistoryComponent;
  let fixture: ComponentFixture<PrescHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
