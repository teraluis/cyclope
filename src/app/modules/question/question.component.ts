import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type} from '@angular/core';
import {Actor} from '../../core/Actor';
import {Movie} from '../../core/Movie';
import {ActorsService} from '../../services/backend/actors.service';
import {MoviesService} from '../../services/backend/movies.service';
import {Rand} from '../../core/Rand';
import {nullImage} from '../../core/nullImg';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {
  @Input() count = 1;
  @Input() movieId;
  @Input() castingId;
  @Output() notify: EventEmitter<Notification> = new EventEmitter<Notification>();
  actor: Actor;
  movie: Movie;
  isLoad: IsLoad = {movie: false, actor: false};
  constructor(private _actorsService: ActorsService, private _moviesService: MoviesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const movie = changes.movieId;
    const casting = changes.castingId;
    if (movie && movie?.previousValue !== movie?.currentValue) {
      this.initMovie();
    }
    if (casting && casting?.previousValue !== casting?.currentValue) {
      this.initCasting();
    }
  }

  initCasting() {
    this._actorsService.getMovieCasting(this.castingId).subscribe((casting) => {
      this.notify.emit(this.setCasting(casting));
    }, (error) => console.log(error));
  }

  initMovie() {
    this._moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
      this.notify.emit(this.setMovie(movie));
    }, (error) => console.log(error));
  }

  setAnswer(yes: boolean): void {
    this.notify.emit( {msg: 'answer', notFound: false, yes, next: true});
    this.isLoad = {movie: false, actor: false};
  }

  isDisabled(): boolean {
      return (!this.isLoad.movie || !this.isLoad.actor);
  }

  getRandomActor(casting: Actor[]): Actor {
    const castingWithImages = casting.filter(actor => actor.img !== nullImage());
    const size = castingWithImages.length;
    const actorPosition = Rand.getRandomInt(size);
    return (size > 0) ? castingWithImages[actorPosition] : casting[Rand.getRandomInt(casting.length)];
  }

  setCasting(casting: Actor[] | []): Notification {
    let msg: string; let notFound: boolean;
    if (casting.length > 0) {
      this.actor = this.getRandomActor(casting);
      msg = 'actor found'; notFound = false;
    } else {
      msg = 'actor not found'; notFound = true;
    }
    this.isLoad.actor = this.setIsLoadActor();
    return {msg, notFound, next: false, castingId: this.castingId};
  }

  setMovie(movie: Movie): Notification {
    let msg: string; let notFound: boolean;
    if (movie.img !== nullImage() && movie.img !== undefined) {
      this.movie = movie; msg = 'movie found'; notFound = false;
    } else {
      msg = 'movie not found'; notFound = true;
    }
    this.isLoad.movie = this.setIsLoadMovie();
    return {msg, notFound, next: false, movie};
  }

  setIsLoadActor(): boolean {
    return (this.actor !== null);
  }

  setIsLoadMovie(): boolean {
    return (this.movie !== null);
  }
}

export interface Notification {
  msg: string;
  yes?: boolean;
  notFound: boolean;
  next?: boolean;
  movie?: Movie;
  castingId?: number;
}

export interface IsLoad {
  movie: boolean;
  actor: boolean;
}
