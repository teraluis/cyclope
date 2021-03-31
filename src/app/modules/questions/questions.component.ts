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
  question: number;
  latest = 500;
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
    this.executeRands();
    this.getLastMovie();
    this.question = 1;
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

  executeRands() {
    if (Rand.pile(10)) {
      this.movieId = Rand.getRandomInt(this.latest);
      this.castingId = this.movieId;
    } else {
      this.movieId = Rand.getRandomInt(this.latest);
      this.castingId = Rand.getRandomInt(this.latest);
    }
  }

  executeRandsMovieId() {
    if (Rand.pile(10)) {
      this.movieId = Rand.randomMovieId();
      this.castingId = this.movieId;
    } else {
      this.movieId = Rand.randomMovieId();
      this.castingId = Rand.randomMovieId();
    }
    console.log(this.movieId);
  }

  getLastMovie() {
    this._moviesService.getLastMovie().subscribe((movie) => {
      const randomLatest = Rand.getRandomInt(movie.id);
      console.log(randomLatest);
      const maxSize = 9000; // After maxSize id their is to many hols in the database
      this.latest = (randomLatest > maxSize) ? maxSize : randomLatest;
    });
  }

  onNotify($event: Notification) {
    console.log($event.msg);
    if ($event.notFound) {
      this.executeRandsMovieId();
    } else {
      if ($event.correct === this.getAnswer()) {
        ++this.score;
      }
      if ($event.next) {
        ++this.question;
        this.executeRands();
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
