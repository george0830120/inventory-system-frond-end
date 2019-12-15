import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemListComponent } from './view-item-list.component';

describe('ViewItemListComponent', () => {
  let component: ViewItemListComponent;
  let fixture: ComponentFixture<ViewItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
