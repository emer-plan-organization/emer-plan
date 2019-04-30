import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasAssessComponent } from './gas-assess.component';

describe('GasAssessComponent', () => {
  let component: GasAssessComponent;
  let fixture: ComponentFixture<GasAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
