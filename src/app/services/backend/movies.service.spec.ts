import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ HttpClient, HttpHandler ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    // expect(service).toBeTruthy();
  });
});
