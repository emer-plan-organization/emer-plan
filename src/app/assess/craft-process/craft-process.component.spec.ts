import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftProcessComponent } from './craft-process.component';

describe('CraftProcessComponent', () => {
  let component: CraftProcessComponent;
  let fixture: ComponentFixture<CraftProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
