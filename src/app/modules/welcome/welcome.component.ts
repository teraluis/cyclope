import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {MoviesService} from '../../services/backend/movies.service';
import {Movie} from '../../core/Movie';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  name = 'cyclope';
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  start() {
    this._router.navigate([MenuStep.QUESTIONS]);
  }

  welcomeMessage(appName: string): string {
    return `Welcome to the ${appName} quizz`;
  }

}
