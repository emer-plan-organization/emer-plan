import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyStatisticsComponent } from './emergency-statistics.component';

describe('EmergencyStatisticsComponent', () => {
  let component: EmergencyStatisticsComponent;
  let fixture: ComponentFixture<EmergencyStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
