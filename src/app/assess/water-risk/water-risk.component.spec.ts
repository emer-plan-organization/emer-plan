import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRiskComponent } from './water-risk.component';

describe('WaterRiskComponent', () => {
  let component: WaterRiskComponent;
  let fixture: ComponentFixture<WaterRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
