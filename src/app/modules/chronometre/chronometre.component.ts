import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chronometre',
  templateUrl: './chronometre.component.html',
  styleUrls: ['./chronometre.component.scss']
})
export class ChronometreComponent implements OnInit {

  @Output() expiration: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() max = 60; // max time in seconds
  private _totalSecondes = 0;
  private _timer;
  seconders = 0;
  minutes = 0;

  constructor() { }

  ngOnInit(): void {
    this.startChronometer();
  }

  startChronometer() {
    this._timer = setInterval( () => {
      this.minutes = Math.floor(++this._totalSecondes / 60);
      this.seconders = ++this._totalSecondes - this.minutes * 60;
      this.stop();
    }, 1000);
  }

  stop() {
    if (this._totalSecondes >= this.max) {
      clearInterval(this._timer);
      this.expiration.emit(true);
    }
  }
}
