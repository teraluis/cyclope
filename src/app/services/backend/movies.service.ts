import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Movie} from '../../core/Movie';
import {catchError, map} from 'rxjs/operators';
import {UtilitiesService} from './utilities.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  getRandomMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this._baseUrl + '/api/movies/movie/random')
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        console.log(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(this._baseUrl + '/api/movies/' + String(movieId))
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        alert(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }

  getLastMovie(): Observable<Movie> {
    return this.http.get<Movie>(this._baseUrl + '/api/movies/latest')
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        alert(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this._baseUrl + '/intern/movies/movie', {
      id: movie.id,
      title: movie.title,
      image: movie.img
    } )
      .pipe(map((resp) => resp), catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(null);
      }));
  }

  getAllMovies(): Observable<Movies> {
    return this.http.get(this._baseUrl + '/intern/movies')
      .pipe(map((resp: Movies) => resp), catchError((error: HttpErrorResponse) => {
        console.log(this.utilitiesService.handleError(error));
        return of(null);
      }));
  }
}

export interface Movies {
  count: number;
  movies: Movie[];
}
