import { TestBed } from '@angular/core/testing';

import { ObjectAttributeService } from './object-attribute.service';

describe('ObjectAttributeService', () => {
  let service: ObjectAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
