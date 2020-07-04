import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrfnamedetComponent } from './prfnamedet.component';

describe('PrfnamedetComponent', () => {
  let component: PrfnamedetComponent;
  let fixture: ComponentFixture<PrfnamedetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrfnamedetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrfnamedetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
