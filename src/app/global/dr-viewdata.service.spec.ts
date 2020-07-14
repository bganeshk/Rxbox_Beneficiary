import { TestBed } from '@angular/core/testing';

import { DrViewdataService } from './dr-viewdata.service';

describe('DrViewdataService', () => {
  let service: DrViewdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrViewdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
