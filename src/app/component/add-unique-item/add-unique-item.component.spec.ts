import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniqueItemComponent } from './add-unique-item.component';

describe('AddUniqueItemComponent', () => {
  let component: AddUniqueItemComponent;
  let fixture: ComponentFixture<AddUniqueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUniqueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUniqueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
