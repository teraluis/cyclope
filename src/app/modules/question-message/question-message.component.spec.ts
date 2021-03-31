import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMessageComponent } from './question-message.component';
import {By} from '@angular/platform-browser';

describe('QuestionMessageComponent', () => {
  let component: QuestionMessageComponent;
  let fixture: ComponentFixture<QuestionMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask Did Mark Hamill play in Star Wars', () => {
    component.actor = 'Mark Hamill';
    component.movie = 'Star Wars';
    fixture.detectChanges();
    const question = fixture.debugElement.query(By.css('.question'));
    const nativeElement: HTMLElement = question.nativeElement
    expect(nativeElement.innerText).toContain('Mark Hamill');
    expect(nativeElement.innerText).toContain('Star Wars');
  });
});
