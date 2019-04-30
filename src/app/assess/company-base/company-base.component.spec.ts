import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessCompanyBaseComponent } from './company-base.component';

describe('AssessCompanyBaseComponent', () => {
  let component: AssessCompanyBaseComponent;
  let fixture: ComponentFixture<AssessCompanyBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessCompanyBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessCompanyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
