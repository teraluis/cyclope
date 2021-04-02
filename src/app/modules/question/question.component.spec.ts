import { QuestionComponent } from './question.component';
import {MoviesService} from '../../services/backend/movies.service';
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
