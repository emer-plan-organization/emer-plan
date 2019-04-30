import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformImplementComponent } from './reform-implement.component';

describe('ReformImplementComponent', () => {
  let component: ReformImplementComponent;
  let fixture: ComponentFixture<ReformImplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReformImplementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReformImplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
