import { Component, OnInit } from '@angular/core';
import {Notification} from '../question/question.component';
import {Rand} from '../../core/Rand';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  highScore: number;
  score: number;
  seconders = 0;
  minutes = 0;
  maxSec = 60;
  movies = 100;
  movieId: number;
  castingId: number;
  question: number;
  private _totalSecondes = 0;
  private _timer;
  constructor() { }

  ngOnInit(): void {
    this.initScore();
    this.startChronometer();
    this.executeRands();
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
    }
  }

  initScore() {
    if (localStorage.getItem('highScore') === null) {
      this.highScore = 0;
    } else {
      this.highScore = parseInt(localStorage.getItem('highScore'), 10);
    }
    this.score = 0;
  }

  executeRands() {
    if (Rand.pile(100)) {
      this.movieId = Rand.getRandomArbitrary(11, 300);
      this.castingId = this.movieId;
    } else {
      this.movieId = Rand.getRandomInt(300);
      this.castingId = Rand.getRandomInt(300);
    }
  }
  onNotify($event: Notification) {
    if ($event.notFound) {
      this.executeRands();
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
}
