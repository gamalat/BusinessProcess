import { TestBed } from '@angular/core/testing';

import { BusinessObjectService } from './business-object.service';

describe('BusinessObjectService', () => {
  let service: BusinessObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
