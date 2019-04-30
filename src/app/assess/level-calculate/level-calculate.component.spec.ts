import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCalculateComponent } from './level-calculate.component';

describe('LevelCalculateComponent', () => {
  let component: LevelCalculateComponent;
  let fixture: ComponentFixture<LevelCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
