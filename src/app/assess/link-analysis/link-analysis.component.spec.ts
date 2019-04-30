import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAnalysisComponent } from './link-analysis.component';

describe('LinkAnalysisComponent', () => {
  let component: LinkAnalysisComponent;
  let fixture: ComponentFixture<LinkAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
