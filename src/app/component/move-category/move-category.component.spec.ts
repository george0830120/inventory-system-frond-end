import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCategoryComponent } from './move-category.component';

describe('MoveCategoryComponent', () => {
  let component: MoveCategoryComponent;
  let fixture: ComponentFixture<MoveCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
