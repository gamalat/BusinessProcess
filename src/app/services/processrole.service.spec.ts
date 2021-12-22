import { TestBed } from '@angular/core/testing';

import { ProcessroleService } from './processrole.service';

describe('ProcessroleService', () => {
  let service: ProcessroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
