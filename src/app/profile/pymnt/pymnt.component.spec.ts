import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PymntComponent } from './pymnt.component';

describe('PymntComponent', () => {
  let component: PymntComponent;
  let fixture: ComponentFixture<PymntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PymntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PymntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
