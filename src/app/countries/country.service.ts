import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ICountry } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private productUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCountry(name: string): Observable<ICountry | undefined> {
    return this.getCountries()
      .pipe(
        map((countries: ICountry[]) => countries.find(p => p.name === name))
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
