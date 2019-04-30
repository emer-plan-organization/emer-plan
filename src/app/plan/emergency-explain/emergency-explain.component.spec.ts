import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyExplainComponent } from './emergency-explain.component';

describe('EmergencyExplainComponent', () => {
  let component: EmergencyExplainComponent;
  let fixture: ComponentFixture<EmergencyExplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyExplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
