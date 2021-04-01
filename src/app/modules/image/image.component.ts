import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() img;
  @Input() alt;
  @Input() title;
  constructor() { }

  ngOnInit(): void {
  }

}
