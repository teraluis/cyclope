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
export class QuestionComponent implements OnChanges {
  @Input() count = 1;
  @Input() movieId;
  @Input() castingId;
  @Input() isIntern: boolean;
  @Output() notify: EventEmitter<Notification> = new EventEmitter<Notification>();
  actor: Actor;
  movie: Movie;

  isLoadActor = false;
  isLoadMovie = false;
  nullImg = 'https://image.tmdb.org/t/p/w500/null';
  isDisabled = false;
  constructor(private _actorsService: ActorsService, private _moviesService: MoviesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const count = changes.count;
    if (!count?.previousValue < !count?.currentValue) {
      this.initCasting();
      this.initMovie();
    } else {
      const movie = changes.movieId;
      const casting = changes.castingId;
      if (movie && movie?.previousValue !== movie?.currentValue) {
        this.initMovie();
      }
      if (casting && casting?.previousValue !== casting.currentValue) {
        this.initCasting();
      }
    }
  }

  initCasting() {
    this._actorsService.getMovieCasting(this.castingId).subscribe((casting) => {
      if (casting.length > 0) {
        const castingWithImages = casting.filter(actor => actor.img !== this.nullImg);
        const size = castingWithImages.length;
        const actorPosition = Rand.getRandomInt(size);
        if (size > 0) {
          this.actor = castingWithImages[actorPosition];
        } else {
          this.actor = casting[Rand.getRandomInt(casting.length)];
        }
        this.isLoadActor = true;
        this.notify.emit( {
          msg: 'actor found',
          notFound: false,
          next: false,
          castingId: this.castingId
        });
        this.isDisabled = false;
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
        if (!this.isIntern) { this._moviesService.addMovie(movie); }
        this.isLoadMovie = true;
        this.notify.emit( {
          msg: 'movie found',
          notFound: false,
          next: false,
          movieId: movie.id
        });
        this.isDisabled = false;
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
    this.isDisabled = true;
  }

  noAnswer() {
    this.notify.emit( {
      msg: 'no answer',
      notFound: false,
      correct: false,
      next: true
    });
    this.isDisabled = true;
  }

}

export interface Notification {
  msg: string;
  correct?: boolean;
  notFound: boolean;
  next?: boolean;
  movieId?: number;
  castingId?: number;
}
