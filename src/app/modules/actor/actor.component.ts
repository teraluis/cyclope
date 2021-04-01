import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  @Input() img;
  @Input() name;
  constructor() { }

  ngOnInit(): void {
  }

}
