import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptorStatisticsComponent } from './acceptor-statistics.component';

describe('AcceptorStatisticsComponent', () => {
  let component: AcceptorStatisticsComponent;
  let fixture: ComponentFixture<AcceptorStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptorStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
