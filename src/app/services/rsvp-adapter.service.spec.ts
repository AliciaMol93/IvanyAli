import { TestBed } from '@angular/core/testing';

import { RsvpAdapterService } from './rsvp-adapter.service';

describe('RsvpAdapterService', () => {
  let service: RsvpAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsvpAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
