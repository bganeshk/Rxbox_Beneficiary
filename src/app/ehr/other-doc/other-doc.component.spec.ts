import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDocComponent } from './other-doc.component';

describe('OtherDocComponent', () => {
  let component: OtherDocComponent;
  let fixture: ComponentFixture<OtherDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
