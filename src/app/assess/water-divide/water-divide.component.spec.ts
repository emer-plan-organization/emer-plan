import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterDivideComponent } from './water-divide.component';

describe('WaterDivideComponent', () => {
  let component: WaterDivideComponent;
  let fixture: ComponentFixture<WaterDivideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterDivideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterDivideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
