import { TestBed } from '@angular/core/testing';

import { RsvpSheetService } from './rsvp-sheet.service';

describe('RsvpSheetService', () => {
  let service: RsvpSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsvpSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
