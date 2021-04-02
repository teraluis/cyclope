import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import {QuestionsComponent} from '../questions/questions.component';
import {RouterTestingModule} from '@angular/router/testing';
import {GameOverComponent} from '../game-over/game-over.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MoviesService} from '../../services/backend/movies.service';
import {Observable} from 'rxjs';
import {ActorsService} from '../../services/backend/actors.service';


describe('QuestionComponent', () => {
  let actorService: ActorsService;
  let moviesService: MoviesService;
  let component: QuestionComponent;

  beforeEach(() => {
    actorService = new ActorsService(null, null);
    moviesService = new MoviesService(null, null);
    component = new QuestionComponent(actorService, moviesService);
  });

  it('should raise next movie when click yes', () => {
    let movie = null;
    component.notify.subscribe(mov => movie = mov);
    component.yesAnswer();
    expect(movie.next).toBeTruthy();
    expect(component.isLoadActor).toBeFalsy();
    expect(component.isLoadMovie).toBeFalsy();
  });

  it('should raise next movie when click no', () => {
    let movie = null;
    component.notify.subscribe(mov => movie = mov);
    component.noAnswer();
    expect(movie.next).toBeTruthy();
    expect(component.isLoadActor).toBeFalsy();
    expect(component.isLoadMovie).toBeFalsy();
  });

});
