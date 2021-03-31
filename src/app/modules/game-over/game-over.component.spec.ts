import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import {MenuStep} from '../../core/menu';
import { GameOverComponent } from './game-over.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {Router} from '@angular/router';



describe('Game is Over', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'welcome', component: WelcomeComponent}]
        )
      ],
      declarations: [ GameOverComponent, WelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should start new quiz when click retry', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.start();

    expect(spy).toHaveBeenCalledWith([MenuStep.QUESTIONS]);
  });

  it('should update new high score when score > high score', () => {
    component.highScore = '4';
    component.score = 10;
    expect(component.updateHighScore()).toBe(true);
  });

  it('should not update high score when score <= high score', () => {
    component.highScore = '4';
    component.score = 1;
    expect(component.updateHighScore()).toBe(false);
  });
});
