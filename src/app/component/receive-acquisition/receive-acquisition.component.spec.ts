import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveAcquisitionComponent } from './receive-acquisition.component';

describe('ReceiveAcquisitionComponent', () => {
  let component: ReceiveAcquisitionComponent;
  let fixture: ComponentFixture<ReceiveAcquisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveAcquisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
