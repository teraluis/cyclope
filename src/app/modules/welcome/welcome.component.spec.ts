import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MoviesService} from '../../services/backend/movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../../core/Movie';

describe('Welcome Screen', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const movieService: Movie = {
    id: 0,
    title: '',
    img: '',
    date: ''
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ WelcomeComponent ],
      providers: [HttpClient, HttpHandler, {provide: MoviesService, useValue: movieService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be greeted by a welcome screen', () => {
    const appName = 'Cyclope';
    expect(component.welcomeMessage(appName)).toContain(appName);
  });

  it('should start the quiz', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.start();

    expect(spy).toHaveBeenCalledWith([MenuStep.QUESTIONS]);
  });

});
