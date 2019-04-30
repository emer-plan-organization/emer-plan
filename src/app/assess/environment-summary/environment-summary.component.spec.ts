import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentSummaryComponent } from './environment-summary.component';

describe('EnvironmentSummaryComponent', () => {
  let component: EnvironmentSummaryComponent;
  let fixture: ComponentFixture<EnvironmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
