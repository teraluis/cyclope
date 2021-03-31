import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorComponent } from './actor.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ScoreService} from '../../services/front/score.service';

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ActorComponent ],
      providers: [{
        provide: ScoreService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

  });
});
