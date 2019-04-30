import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasDivideComponent } from './gas-divide.component';

describe('GasDivideComponent', () => {
  let component: GasDivideComponent;
  let fixture: ComponentFixture<GasDivideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasDivideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasDivideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
