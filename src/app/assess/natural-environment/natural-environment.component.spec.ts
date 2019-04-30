import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalEnvironmentComponent } from './natural-environment.component';

describe('NaturalEnvironmentComponent', () => {
  let component: NaturalEnvironmentComponent;
  let fixture: ComponentFixture<NaturalEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturalEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
