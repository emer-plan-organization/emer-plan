import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftStatisticsComponent } from './craft-statistics.component';

describe('CraftStatisticsComponent', () => {
  let component: CraftStatisticsComponent;
  let fixture: ComponentFixture<CraftStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
