import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GameOverComponent} from '../game-over/game-over.component';
import {WelcomeComponent} from '../welcome/welcome.component';

describe('When the game is over', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'game-over', component: GameOverComponent}]
        ),
        HttpClientTestingModule
      ],
      declarations: [ GameOverComponent, WelcomeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update new high score when score > high score', () => {
    component.highScore = 4;
    component.score = 10;
    expect(component.updateHighScore()).toBe(true);
  });

  it('should not update high score when score <= high score', () => {
    component.highScore = 4;
    component.score = 1;
    expect(component.updateHighScore()).toBe(false);
  });
});
