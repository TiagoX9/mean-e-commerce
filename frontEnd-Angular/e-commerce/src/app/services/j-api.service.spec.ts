import { TestBed, inject } from '@angular/core/testing';

import { JApiService } from './j-api.service';

describe('JApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JApiService]
    });
  });

  it('should be created', inject([JApiService], (service: JApiService) => {
    expect(service).toBeTruthy();
  }));
});
