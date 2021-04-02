import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notification} from '../question/question.component';
import {Rand} from '../../core/Rand';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {Subscription} from 'rxjs';
import {ScoreService} from '../../services/front/score.service';
import {Movies, MoviesService} from '../../services/backend/movies.service';
import {mergeMap} from 'rxjs/operators';
import {Movie} from '../../core/Movie';
import {J} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  highScore: number;
  score: number;
  movieId: number;
  castingId: number;
  question = 1;
  latest = 1000;
  intern = new Rand();
  scoreSubscription: Subscription;

  constructor(private router: Router,
              public scoreService: ScoreService,
              public movieService: MoviesService) { }

  ngOnInit(): void {
    this.scoreWatcher();
    this.initScore();
    this.initLatest();
    this.executeRandsMovieId(false);
    this.loadMoviesFromDB();
  }

  scoreWatcher() {
    this.scoreSubscription = this.scoreService.scoreSubject.subscribe( (score) => {
      this.score = score;
    });
    this.scoreService.emitScoreSubject();
  }

  movie($event: Notification) {
    if ($event.notFound) {
      this.notFound($event.msg);
    } else {
      if ($event.correct === this.getAnswer()) {
        ++this.score;
      }
      if ($event.next) {
        ++this.question;
        this.executeRandsMovieId(true);
      }
    }
  }

  notFound(message: string) {
    switch (message) {
      case 'movie not found':
        this.movieId = this.getRandomId(false);
        break;
      case 'actor not found':
        this.castingId = this.getRandomId(false);
        break;
      default:
        this.executeRandsMovieId(false);
    }
  }

  chronometer($event: boolean) {
    if ($event) {
      this.scoreService.setScore(this.score);
      this.router.navigate([MenuStep.GAME_OVER]);
    }
  }

  initScore() {
    if (localStorage.getItem('highScore') === null) {
      localStorage.setItem('highScore', '0');
      this.highScore = 0;
    } else {
      this.highScore = parseInt(localStorage.getItem('highScore'), 10);
    }
    this.score = 0;
  }

  initLatest() {
    if (localStorage.getItem('latest') !== null) {
      this.latest = parseInt(localStorage.getItem('latest'), 10);
    }
  }

  loadMoviesFromDB() {
    this.movieService.getAllMovies().subscribe((resp: Movies) => {
      const movies: Movie[] = resp.movies;
      movies.forEach(movie => {
        this.intern.addMovieId(movie.id);
      });
    });
  }

  executeRandsMovieId(theMDB?: boolean) {
    this.movieId = this.getRandomId(theMDB);
    this.castingId = this.getRandomId(theMDB);
    if (Rand.pile(10)) { this.castingId = this.movieId; }
  }

  getRandomId(theMDB: boolean): number {
    return (theMDB) ? Rand.getRandomInt(this.latest) : this.intern.randomMovieId();
  }

  getAnswer() {
    return (this.movieId === this.castingId);
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
