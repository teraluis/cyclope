import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {MoviesService} from '../../services/backend/movies.service';
import {Movie} from '../../core/Movie';
import {Rand} from '../../core/Rand';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  name = 'cyclope';
  latestLoad = false;
  constructor(private _router: Router, public movieService: MoviesService) { }

  ngOnInit(): void {
    this.getLastMovie();
  }

  start() {
    this._router.navigate([MenuStep.QUESTIONS]);
  }

  welcomeMessage(appName: string): string {
    return `Welcome to the ${appName} quizz`;
  }

  getLastMovie() {
    this.movieService.getLastMovie().subscribe((movie) => {
      localStorage.setItem('latest', String(movie.id));
      this.latestLoad = true;
    });
  }
}
