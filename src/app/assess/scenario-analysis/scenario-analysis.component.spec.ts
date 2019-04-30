import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioAnalysisComponent } from './scenario-analysis.component';

describe('ScenarioAnalysisComponent', () => {
  let component: ScenarioAnalysisComponent;
  let fixture: ComponentFixture<ScenarioAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
