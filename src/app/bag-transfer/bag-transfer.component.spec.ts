import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagTransferComponent } from './bag-transfer.component';

describe('BagTransferComponent', () => {
  let component: BagTransferComponent;
  let fixture: ComponentFixture<BagTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
