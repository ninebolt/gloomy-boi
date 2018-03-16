import { TestBed, inject } from '@angular/core/testing';

import { LineParserService } from './line-parser.service';

describe('LineParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineParserService]
    });
  });

  it('should be created', inject([LineParserService], (service: LineParserService) => {
    expect(service).toBeTruthy();
  }));
});
