import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsequenceAnalysisComponent } from './consequence-analysis.component';

describe('ConsequenceAnalysisComponent', () => {
  let component: ConsequenceAnalysisComponent;
  let fixture: ComponentFixture<ConsequenceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsequenceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsequenceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
