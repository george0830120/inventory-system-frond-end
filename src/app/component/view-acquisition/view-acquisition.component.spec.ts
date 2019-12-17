import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcqusitionComponent } from './view-acqusition.component';

describe('ViewAcqusitionComponent', () => {
  let component: ViewAcqusitionComponent;
  let fixture: ComponentFixture<ViewAcqusitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAcqusitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcqusitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
