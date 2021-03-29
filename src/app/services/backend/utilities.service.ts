import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(protected router: Router) { }

  getUtilities(): RequestUtilities {
    const token: string = localStorage.getItem('token');
    const headers = new HttpHeaders( {
      user_token: token
    });
    return new RequestUtilities(headers);
  }

  handleError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401:
        localStorage.clear()
        return 'Votre token a expiré. Veuillez vous reconecter';
        break;
      case 403:
        localStorage.clear()
        return 'Opération non permise';
      default:
        return 'Un problème technique est survenu.';
    }
  }
}

export class RequestUtilities {
  headers: HttpHeaders;

  constructor(headers: HttpHeaders) {
    this.headers = headers;
  }
}
