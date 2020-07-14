import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhomeComponent } from './drhome.component';

describe('DrhomeComponent', () => {
  let component: DrhomeComponent;
  let fixture: ComponentFixture<DrhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
