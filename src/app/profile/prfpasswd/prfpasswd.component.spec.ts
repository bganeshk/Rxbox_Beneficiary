import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrfpasswdComponent } from './prfpasswd.component';

describe('PrfpasswdComponent', () => {
  let component: PrfpasswdComponent;
  let fixture: ComponentFixture<PrfpasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrfpasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrfpasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
