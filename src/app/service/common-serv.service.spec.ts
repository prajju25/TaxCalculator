import { TestBed } from '@angular/core/testing';

import { CommonServService } from './common-serv.service';

describe('CommonServService', () => {
  let service: CommonServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
