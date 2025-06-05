import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBagTransferComponent } from './popup-bag-transfer.component';

describe('PopupBagTransferComponent', () => {
  let component: PopupBagTransferComponent;
  let fixture: ComponentFixture<PopupBagTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupBagTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupBagTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
