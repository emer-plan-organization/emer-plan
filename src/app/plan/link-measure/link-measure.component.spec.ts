import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMeasureComponent } from './link-measure.component';

describe('LinkMeasureComponent', () => {
  let component: LinkMeasureComponent;
  let fixture: ComponentFixture<LinkMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
