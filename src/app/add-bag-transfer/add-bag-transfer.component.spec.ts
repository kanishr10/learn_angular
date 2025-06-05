import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBagTransferComponent } from './add-bag-transfer.component';

describe('AddBagTransferComponent', () => {
  let component: AddBagTransferComponent;
  let fixture: ComponentFixture<AddBagTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBagTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBagTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
