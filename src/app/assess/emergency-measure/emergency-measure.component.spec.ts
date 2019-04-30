import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMeasureComponent } from './emergency-measure.component';

describe('EmergencyMeasureComponent', () => {
  let component: EmergencyMeasureComponent;
  let fixture: ComponentFixture<EmergencyMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
