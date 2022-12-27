import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-load',
  template: `<h1>Lazy loaded module works</h1>`,
})
export class LazyLoadComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

}
