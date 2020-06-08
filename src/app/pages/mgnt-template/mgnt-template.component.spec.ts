import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgntTemplateComponent } from './mgnt-template.component';

describe('MgntTemplateComponent', () => {
  let component: MgntTemplateComponent;
  let fixture: ComponentFixture<MgntTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgntTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgntTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
