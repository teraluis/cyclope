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
  constructor(private _router: Router, public scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.scoreService.scoreSubject.subscribe( (score) => {
      this.score = score;
      this.scoreIsLoad = true;
      this.redirect();
    });
    this.scoreService.emitScoreSubject();
  }

  start() {
    this._router.navigate([MenuStep.QUESTIONS]);
  }

  getMessage(): string {
    if (this.score > parseInt(this.highScore, 10)) {
      return 'Congratulations you beat your score';
    } else {
      return 'Thanks for your participation';
    }
  }

  redirect() {
    if (this.score === -1) {
      this._router.navigate([MenuStep.HOME]);
    }
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
