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


describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'game-over', component: GameOverComponent}]
        ),
        HttpClientTestingModule
      ],
      declarations: [ GameOverComponent, WelcomeComponent ],
      providers: [MoviesService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
