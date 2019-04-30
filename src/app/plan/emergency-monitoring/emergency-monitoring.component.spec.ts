import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMonitoringComponent } from './emergency-monitoring.component';

describe('EmergencyMonitoringComponent', () => {
  let component: EmergencyMonitoringComponent;
  let fixture: ComponentFixture<EmergencyMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
