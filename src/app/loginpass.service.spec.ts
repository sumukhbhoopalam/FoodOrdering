import { TestBed } from '@angular/core/testing';

import { LoginpassService } from './loginpass.service';

describe('LoginpassService', () => {
  let service: LoginpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
