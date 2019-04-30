import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyResultComponent } from './emergency-result.component';

describe('EmergencyResultComponent', () => {
  let component: EmergencyResultComponent;
  let fixture: ComponentFixture<EmergencyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
