import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'learn-renderer2',
  templateUrl: './renderer.html'
})
export class MyRenderer {}

@Component({
  selector: 'learn-renderer',
  template: `
    <div #myEle>Hi, I'm an element.</div>
    <button #myButton>Click to increment!</button>
  `,
  styles: [
    `
      .my-color {
        color: red;
      }

      .mod-color {
        color: #0887de;
      }
    `
  ]
})
export class ElementWithRenderer {
  clickListener: any;
  count = 0;
  constructor(private renderer: Renderer2) {}

  @ViewChild('myEle', { static: false }) myEle!: ElementRef;
  @ViewChild('myButton', { static: false }) myButton!: ElementRef;

  ngAfterViewInit() {
    console.log(this.renderer);
    this.renderer.addClass(this.myEle.nativeElement, 'my-color');
    this.renderer.setStyle(this.myEle.nativeElement, 'border', '2px solid red');
    const p = this.renderer.createElement('p');
    const txt = this.renderer.createText("Hi, I'm a paragraph node.");
    // use appendChild to append newly created text node to the p tag
    this.renderer.appendChild(p, txt);
    // add the paragraph to existing dom using appendChild
    this.renderer.appendChild(this.myEle.nativeElement, p);
    setTimeout(() => {
      this.renderer.setProperty(
        this.myEle.nativeElement,
        'innerHTML',
        `Hi, I'm an element modified by renderer2`
      );
      this.renderer.removeClass(this.myEle.nativeElement, 'my-color');
      this.renderer.addClass(this.myEle.nativeElement, 'mod-color');
    }, 3000);

    this.clickListener = this.renderer.listen(
      this.myButton.nativeElement,
      'click',
      (evt) => {
        this.count++;
      }
    );
  }
}
