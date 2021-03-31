import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import {MenuStep} from '../../core/menu';
import { GameOverComponent } from './game-over.component';
import {WelcomeComponent} from '../welcome/welcome.component';



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

  it('should be higScore >= score', () => {
    expect(component.highScore).toBeGreaterThanOrEqual(component.score);
  });
});
