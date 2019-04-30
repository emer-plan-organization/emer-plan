import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyWarnComponent } from './emergency-warn.component';

describe('EmergencyWarnComponent', () => {
  let component: EmergencyWarnComponent;
  let fixture: ComponentFixture<EmergencyWarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyWarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
