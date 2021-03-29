import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuStep} from '../../core/menu';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() name = 'cyclope';
  time = 60;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  start() {
    this.router.navigate([MenuStep.QUESTIONS]);
  }

}
