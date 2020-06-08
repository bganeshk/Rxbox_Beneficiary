import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescFfmntComponent } from './presc-ffmnt.component';

describe('PrescFfmntComponent', () => {
  let component: PrescFfmntComponent;
  let fixture: ComponentFixture<PrescFfmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescFfmntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescFfmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
