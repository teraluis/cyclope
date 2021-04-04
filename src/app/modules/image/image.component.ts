import {Component, Input, OnInit} from '@angular/core';
import {nullImage} from '../../core/nullImg';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() img = '../../../assets/image-not-found.jpeg';
  @Input() alt;
  @Input() title;
  notFound = nullImage();
  constructor() { }

  ngOnInit(): void {
  }

}
