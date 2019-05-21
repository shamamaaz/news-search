import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearch } from './search';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  Url = `http://hn.algolia.com/api/v1/search`

  constructor(
    private http: HttpClient
  ) { }

  search(queryname: string): Observable<ISearch> {
    const options = queryname ?
    { params: new HttpParams().set('query', queryname) } : {};
		return this.http.get<ISearch>(this.Url, options ).pipe(
			tap(response => response.hits)
		);
  }
  
  next(queryname: string, nextPage: number): Observable<ISearch> {
		return this.http.get<ISearch>(`${this.Url}/?query=${queryname}&page=${nextPage}` ).pipe(
			tap(response => response.hits)
		);
	}
}
