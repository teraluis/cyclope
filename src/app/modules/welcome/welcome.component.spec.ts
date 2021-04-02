import { WelcomeComponent } from './welcome.component';
import {MoviesService} from '../../services/backend/movies.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuStep} from '../../core/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Movie} from '../../core/Movie';
import {QuestionsComponent} from '../questions/questions.component';
import {HttpClient} from '@angular/common/http';
import {UtilitiesService} from '../../services/backend/utilities.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

class RouterStub {
  navigate(params) {}
}
class UtilitiesServiceStub {}
describe('Welcome Screen', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ WelcomeComponent ],
      providers: [
        {provide: UtilitiesService, useClass: UtilitiesServiceStub},
        {provide: Router, useClass: RouterStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should be greeted by a welcome screen', () => {
    const appName = 'Cyclope';
    expect(component.welcomeMessage(appName)).toContain(appName);
  });

  it('should start quiz when click start', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.start();
    expect(spy).toHaveBeenCalledWith([MenuStep.QUESTIONS]);
  });
});
