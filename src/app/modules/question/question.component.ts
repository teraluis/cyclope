import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type} from '@angular/core';
import {Actor} from '../../core/Actor';
import {Movie} from '../../core/Movie';
import {ActorsService} from '../../services/backend/actors.service';
import {MoviesService} from '../../services/backend/movies.service';
import {Rand} from '../../core/Rand';
import {timeout} from 'rxjs/operators';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() count = 1;
  @Input() movieId;
  @Input() castingId;
  @Output() notify: EventEmitter<Notification> = new EventEmitter<Notification>();
  actor: Actor;
  movie: Movie;

  isLoadActor = false;
  isLoadMovie = false;
  nullImg = 'https://image.tmdb.org/t/p/w500/null';

  constructor(private _actorsService: ActorsService, private _moviesService: MoviesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!changes.movieId.isFirstChange() && !changes.castingId.isFirstChange()) {
      this.initMovie();
      this.initCasting();
    }
  }

  ngOnInit(): void {
    this.initCasting();
    this.initMovie();
  }

  initCasting() {
    this._actorsService.getMovieCasting(this.castingId).subscribe((casting) => {
      if (casting.length > 0) {
        const castingWithImages = casting.filter(actor => actor.img !== this.nullImg);
        const size = castingWithImages.length;
        const actorPosition = Rand.getRandomInt(size);
        this.actor = castingWithImages[actorPosition];
        this.isLoadActor = true;
        this.notify.emit( {
          msg: 'actor found',
          notFound: false,
          next: false
        });
      } else {
        this.notify.emit( {
          msg: 'actor not found',
          notFound: true,
          next: false
        });
        this.isLoadActor = false;
      }
    }, (error) => console.log(error));
  }

  initMovie() {
    this._moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
      if (movie.img !== this.nullImg && movie.img !== undefined) {
        this.movie = movie;
        this._moviesService.addMovie(movie).subscribe((resp) => console.log(resp));
        this.isLoadMovie = true;
        this.notify.emit( {
          msg: 'movie found',
          notFound: false,
          next: false,
          movie: this.movie
        });
      } else {
        this.notify.emit( {
          msg: 'movie not found',
          notFound: true,
          next: false
        });
        this.isLoadMovie = false;
      }
    }, (error) => console.log(error));
  }

  yesAnswer() {
    this.notify.emit( {
      msg: 'yes answer',
      notFound: false,
      correct: true,
      next: true
    });
    this.isLoadMovie = false;
  }

  noAnswer() {
    this.notify.emit( {
      msg: 'no answer',
      notFound: false,
      correct: false,
      next: true
    });
    this.isLoadMovie = false;
  }

}

export interface Notification {
  msg: string;
  correct?: boolean;
  notFound: boolean;
  next?: boolean;
  movie?: Movie;
}
