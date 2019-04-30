import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyPlaceComponent } from './emergency-place.component';

describe('EmergencyPlaceComponent', () => {
  let component: EmergencyPlaceComponent;
  let fixture: ComponentFixture<EmergencyPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
