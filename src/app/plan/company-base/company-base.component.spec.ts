import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCompanyBaseComponent } from './company-base.component';

describe('PlanCompanyBaseComponent', () => {
  let component: PlanCompanyBaseComponent;
  let fixture: ComponentFixture<PlanCompanyBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCompanyBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCompanyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
