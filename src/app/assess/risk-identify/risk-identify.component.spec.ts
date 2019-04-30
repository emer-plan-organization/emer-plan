import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIdentifyComponent } from './risk-identify.component';

describe('RiskIdentifyComponent', () => {
  let component: RiskIdentifyComponent;
  let fixture: ComponentFixture<RiskIdentifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskIdentifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
