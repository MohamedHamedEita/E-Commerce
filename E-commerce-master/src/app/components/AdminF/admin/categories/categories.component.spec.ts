import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoriesComponent]
    });
    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
