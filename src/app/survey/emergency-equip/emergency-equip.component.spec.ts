import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyEquipComponent } from './emergency-equip.component';

describe('EmergencyEquipComponent', () => {
  let component: EmergencyEquipComponent;
  let fixture: ComponentFixture<EmergencyEquipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyEquipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyEquipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
