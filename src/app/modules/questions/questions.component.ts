import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notification} from '../question/question.component';
import {Rand} from '../../core/Rand';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {Subscription} from 'rxjs';
import {ScoreService} from '../../services/front/score.service';
import {MoviesService} from '../../services/backend/movies.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  highScore: number;
  score: number;
  seconders = 0;
  minutes = 0;
  maxSec = 60;
  movieId: number;
  castingId: number;
  question = 1;
  latest = 1000;
  private _totalSecondes = 0;
  private _timer;
  scoreSubscription: Subscription;

  constructor(private router: Router, public scoreService: ScoreService, public _moviesService: MoviesService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.scoreService.scoreSubject.subscribe( (score) => {
      this.score = score;
    });
    this.scoreService.emitScoreSubject();
    this.initScore();
    this.startChronometer();
    this.initLatest();
    this.executeRandsMovieId(false);
  }

  startChronometer() {
    this._timer = setInterval( () => {
      this.minutes = Math.floor(++this._totalSecondes / 60);
      this.seconders = ++this._totalSecondes - this.minutes * 60;
      this.stop();
    }, 1000);
  }

  stop() {
    if (this._totalSecondes >= this.maxSec) {
      clearInterval(this._timer);
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
    if (localStorage.getItem('latest') === null) {
      this.getLastMovie();
    } else {
      this.latest = parseInt(localStorage.getItem('latest'), 10);
    }
  }
  executeRandsMovieId(theMDB?: boolean) {
    if (Rand.pile(10)) {
      this.movieId = this.getRandomId(theMDB);
      this.castingId = this.movieId;
    } else {
      this.movieId = this.getRandomId(theMDB);
      this.castingId = this.getRandomId(theMDB);
    }
  }

  getRandomId(theMDB: boolean): number {
    return (theMDB) ? Rand.getRandomInt(this.latest) : Rand.randomMovieId();
  }

  getLastMovie() {
    console.log('getLastMovie');
    this._moviesService.getLastMovie().subscribe((movie) => {
      this.latest = Rand.getRandomInt(movie.id);
      localStorage.setItem('latest', String(this.latest));
    });
  }

  onNotify($event: Notification) {
    if ($event.notFound) {
      console.log($event.msg);
    }
    if ($event.notFound) {
      this.executeRandsMovieId(false);
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

  getAnswer() {
    return (this.movieId === this.castingId);
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
