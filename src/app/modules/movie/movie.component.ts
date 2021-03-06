import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Rand} from '../../core/Rand';
import {mergeMap} from 'rxjs/operators';
import {MoviesService} from '../../services/backend/movies.service';
import {Movie} from '../../core/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  id: number;
  constructor(private _movieService: MoviesService) { }

  ngOnInit(): void {
    this.id = Rand.getRandomInt(10000);
    console.log(this.id);
    /*
      we could put a setInterval to hydrate the database randomly
     */
    this.addMovieMergeMap(this.id);
  }

  addMovieMergeMap(id: number) {
    this._movieService.getMovieById(id)
      .pipe(mergeMap((movie: Movie) => this._movieService.addMovie(movie)))
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
