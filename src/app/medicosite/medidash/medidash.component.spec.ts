import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidashComponent } from './medidash.component';

describe('MedidashComponent', () => {
  let component: MedidashComponent;
  let fixture: ComponentFixture<MedidashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
