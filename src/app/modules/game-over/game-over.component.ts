import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuStep} from '../../core/menu';
import {Router} from '@angular/router';
import {ScoreService} from '../../services/front/score.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit, OnDestroy {
  score = 0;
  highScore = localStorage.getItem('highScore');
  scoreIsLoad = false;
  scoreSubscription: Subscription;
  highScoreBeated = false;
  constructor(private _router: Router, public scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.scoreService.scoreSubject.subscribe( (score) => {
      this.score = score;
      this.scoreIsLoad = true;
      this.updateHighScore();
      this.redirect();
    });
    this.scoreService.emitScoreSubject();
  }

  start() {
    this._router.navigate([MenuStep.QUESTIONS]);
  }

  getMessage(): string {
    if (this.highScoreBeated) {
      return 'Congratulations you beat your high score';
    } else {
      return 'Thanks for your contribution';
    }
  }

  redirect() {
    if (this.score === -1) {
      this._router.navigate([MenuStep.HOME]);
    }
  }

  updateHighScore(): boolean {
    if (this.score > parseInt(this.highScore, 10)) {
      this.highScoreBeated = true;
      localStorage.setItem('highScore', String(this.score));
    }
    return (this.score > parseInt(this.highScore, 10));
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
