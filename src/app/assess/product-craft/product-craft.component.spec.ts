import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCraftComponent } from './product-craft.component';

describe('ProductCraftComponent', () => {
  let component: ProductCraftComponent;
  let fixture: ComponentFixture<ProductCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
