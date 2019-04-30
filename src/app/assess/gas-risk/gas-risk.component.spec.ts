import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasRiskComponent } from './gas-risk.component';

describe('GasRiskComponent', () => {
  let component: GasRiskComponent;
  let fixture: ComponentFixture<GasRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
