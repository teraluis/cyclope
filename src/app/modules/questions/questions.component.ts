import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notification} from '../question/question.component';
import {Rand} from '../../core/Rand';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {Subscription} from 'rxjs';
import {ScoreService} from '../../services/front/score.service';
import {Movies, MoviesService} from '../../services/backend/movies.service';
import {Movie} from '../../core/Movie';
import {StorageHelper} from '../../helper/StorageHelper';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  scoreSubscription: Subscription;
  highScore: number;
  score: number;
  movieId: number;
  castingId: number;
  question = 1;
  latest: number;
  intern = new Rand();
  dbCount: number;
  isIntern: boolean;
  constructor(private router: Router, public scoreService: ScoreService, public movieService: MoviesService) {}

  ngOnInit(): void {
    this.scoreWatcher();
    this.latest = StorageHelper.initStorage('latest', 1000);
    this.highScore = StorageHelper.initStorage('highScore', 0);
    this.dbCount = StorageHelper.initStorage('dbCount', 10);
    this.score = 0;
    this.loadMoviesFromDB(this.dbCount);
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

  loadMoviesFromDB(limit: number) {
    const rand = Rand.customRand(limit, 100);
    this.movieService.getAllMovies(rand[0], rand[1]).subscribe((resp: Movies) => {
      const movies: Movie[] = resp.movies;
      movies.forEach(movie => {
        this.intern.addMovieId(movie.id);
      });
      this.executeRandsMovieId(false);
    });
  }

  executeRandsMovieId(theMDB?: boolean) {
    (theMDB) ? this.isIntern = false : this.isIntern = true;
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
