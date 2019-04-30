import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgListViewComponent } from './img-list-view.component';

describe('ImgListViewComponent', () => {
  let component: ImgListViewComponent;
  let fixture: ComponentFixture<ImgListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
