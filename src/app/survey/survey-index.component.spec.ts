import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyIndexComponent } from './survey-index.component';

describe('SurveyIndexComponent', () => {
  let component: SurveyIndexComponent;
  let fixture: ComponentFixture<SurveyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
