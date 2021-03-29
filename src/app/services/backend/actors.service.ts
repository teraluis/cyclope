import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UtilitiesService} from './utilities.service';
import {catchError, map} from 'rxjs/operators';
import {Actor} from '../../core/Actor';
import {Observable, of} from 'rxjs';
import {Error} from '../../core/Error';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private _baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  getRandomCasting(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this._baseUrl + `/api/movies/casting/random`)
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        console.log(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }

  getMovieCasting(movieId: number): Observable<Actor[]> {
    return this.http.get<Actor[]>(this._baseUrl + `/api/movies/${String(movieId)}/casting`)
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        alert(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }
}

