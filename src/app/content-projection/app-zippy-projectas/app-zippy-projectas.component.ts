import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zippy-projectas',
  template: `
  <h2>Content projection with ngProjectAs</h2>

Default:
<ng-content></ng-content>

Question:
<ng-content select="[question]"></ng-content>
  `
})
export class AppZippyProjectasComponent implements OnInit {

  question: string = 'hi';
  constructor() { }

  ngOnInit() {
  }

}
