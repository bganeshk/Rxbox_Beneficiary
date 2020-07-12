import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSerachComponent } from './customer-serach.component';

describe('CustomerSerachComponent', () => {
  let component: CustomerSerachComponent;
  let fixture: ComponentFixture<CustomerSerachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSerachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSerachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
