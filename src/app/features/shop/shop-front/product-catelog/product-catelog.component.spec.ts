import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatelogComponent } from './product-catelog.component';

describe('ProductCatelogComponent', () => {
  let component: ProductCatelogComponent;
  let fixture: ComponentFixture<ProductCatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCatelogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
