import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWayComponent } from './contact-way.component';

describe('ContactWayComponent', () => {
  let component: ContactWayComponent;
  let fixture: ComponentFixture<ContactWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
