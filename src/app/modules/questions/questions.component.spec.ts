import {Router} from '@angular/router';
import {MoviesService} from '../../services/backend/movies.service';
import {ScoreService} from '../../services/front/score.service';
import {QuestionsComponent} from './questions.component';

describe('Questions', () => {
  let component: QuestionsComponent;
  let router: Router;
  let moviesService: MoviesService;
  let scoreService: ScoreService;

  beforeEach( () => {
    moviesService = new MoviesService(null, null);
    scoreService = new ScoreService();
    component = new QuestionsComponent(router, scoreService, moviesService);
  });

  it('should get true if movieId and castingId are equals', () => {
    component.movieId = 11;
    component.castingId = 11;
    expect(component.getAnswer).toBeTruthy();
  });

  it('should hydrate movie table', () => {
    const moviesSize = component.intern.database.length;
    component.intern.addMovieId(15);
    const newMoviesSize = component.intern.database.length;
    expect(moviesSize).toBeGreaterThanOrEqual(newMoviesSize);
  });

  it('should give a random from intern database table', () => {
    const movieIntern = component.intern.database;
    expect(movieIntern).toContain(component.getRandomId(false));
  });

  it('should add movies only if is not in intern database', () => {
    const first = component.intern.database[0];
    component.intern.addMovieId(first);
    // @ts-ignore
    const count = component.intern.database.filter(x => first === x).length;
    expect(count).toBe(1);
  });

  it('should increment score when we have a good answer', () =>{
    component.movieId = 11;
    component.castingId = 11;
    component.score = 0;
    expect(component.incrementScore(true)).toBe(1);
  });

  it('should increment question number when call next', () => {
    component.question = 3;
    expect(component.nextQuestion(true)).toBe(4);
  });
  it('should change movie id when click next', () => {
    component.movieId = 11;
    component.nextQuestion(true);
    expect(component.movieId).not.toBe(11);
  });
});
