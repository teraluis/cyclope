import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-message',
  templateUrl: './question-message.component.html',
  styleUrls: ['./question-message.component.scss']
})
export class QuestionMessageComponent implements OnInit {

  @Input() actor: string;
  @Input() movie: string;

  constructor() { }

  ngOnInit(): void {
  }

}
