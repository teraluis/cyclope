import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  score = 0;
  scoreSubject = new Subject<number>();

  constructor() { }

  emitScoreSubject() {
    this.scoreSubject.next(this.score);
  }

  setScore(score: number) {
    this.score = score;
    this.emitScoreSubject();
  }
}
