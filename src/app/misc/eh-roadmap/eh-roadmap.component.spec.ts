import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhRoadmapComponent } from './eh-roadmap.component';

describe('EhRoadmapComponent', () => {
  let component: EhRoadmapComponent;
  let fixture: ComponentFixture<EhRoadmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhRoadmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
