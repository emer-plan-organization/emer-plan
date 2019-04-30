import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentQualityComponent } from './environment-quality.component';

describe('EnvironmentQualityComponent', () => {
  let component: EnvironmentQualityComponent;
  let fixture: ComponentFixture<EnvironmentQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
