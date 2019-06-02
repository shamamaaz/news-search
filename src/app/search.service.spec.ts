import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { ISearch } from './search';
import { HttpErrorResponse } from '@angular/common/http';

let httpClientSpy: { get: jasmine.Spy };
let searchService: SearchService;

describe('SearchService', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });

it('should be created', inject([SearchService], (service: SearchService) => {
  expect(service).toBeTruthy();
}));

it('should return expected Search (HttpClient called once)', () => {
    const expectedSearch: ISearch[] =
      [{ author: "coloneltcb", title: "Facebook Network Breach Impacts Up to 50M Users", url: "https://www.nytimes.com/2018/09/28/technology/facebook-hack-data-breach.html" }, 
       { author: "tambourine_man", title: "Facebook is an attack on the open web", url: "https://daringfireball.net/2017/06/fuck_facebook" }
      ];
   
    httpClientSpy.get.and.returnValue(asyncData(expectedSearch));
   
    SearchService.search("facebook").subscribe(
      search => expect(search).toEqual(expectedSearch, 'expected Search'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
   
    SearchService.search("facebook").subscribe(
      heroes => fail('expected an error, not search'),
      error  => expect(error.message).toContain('test 404 error')
    );
});
import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { ISearch } from './search';
import { HttpErrorResponse } from '@angular/common/http';

let httpClientSpy: { get: jasmine.Spy };
let searchService: SearchService;

describe('SearchService', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });
});



it('should be created', inject([SearchService], (service: SearchService) => {
  expect(service).toBeTruthy();
}));

  it('should return expected Search (HttpClient called once)', () => {
    const expectedSearch: ISearch[] =
      [{ author: "coloneltcb", title: "Facebook Network Breach Impacts Up to 50M Users", url: "https://www.nytimes.com/2018/09/28/technology/facebook-hack-data-breach.html" }, 
       { author: "tambourine_man", title: "Facebook is an attack on the open web", url: "https://daringfireball.net/2017/06/fuck_facebook" }
      ];
   
    httpClientSpy.get.and.returnValue(asyncData(expectedSearch));
   
    SearchService.search("facebook").subscribe(
      search => expect(search).toEqual(expectedSearch, 'expected Search'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
   
    SearchService.search("facebook").subscribe(
      heroes => fail('expected an error, not search'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });
});

