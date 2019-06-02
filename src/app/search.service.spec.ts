import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { TestSearch } from './searchtest';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let searchService: SearchService;

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [searchService]
    });
  });

  it('should be created', inject([searchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected Search (HttpClient called once)', () => {
    const expectedSearch: TestSearch[] =
      [{ author: "coloneltcb", title: "Facebook Network Breach Impacts Up to 50M Users", url: "https://www.nytimes.com/2018/09/28/technology/facebook-hack-data-breach.html" },
      { author: "tambourine_man", title: "Facebook is an attack on the open web", url: "https://daringfireball.net/2017/06/fuck_facebook" }
      ];

    httpClientSpy.get.and.returnValue(of(expectedSearch));

    searchService.search("facebook").subscribe(
      search => expect(search).toEqual(expectedSearch, 'expectedSearch')
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    searchService.search("facebook").subscribe(
      error => expect(error.message).toContain('test 404 error')
    );
  });
});
