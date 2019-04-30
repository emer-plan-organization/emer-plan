import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAssessComponent } from './water-assess.component';

describe('WaterAssessComponent', () => {
  let component: WaterAssessComponent;
  let fixture: ComponentFixture<WaterAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
