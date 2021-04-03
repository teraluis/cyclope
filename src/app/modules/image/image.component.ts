import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() img = '../../../assets/image-not-found.jpeg';
  @Input() alt;
  @Input() title;
  notFound = 'https://image.tmdb.org/t/p/w500/null';
  constructor() { }

  ngOnInit(): void {
  }

}
