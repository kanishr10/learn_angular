import { TestBed } from '@angular/core/testing';

import { BagTransferService } from './bag-transfer.service';

describe('BagTransferService', () => {
  let service: BagTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BagTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
