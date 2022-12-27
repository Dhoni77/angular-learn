import { Component, Directive, HostBinding, HostListener, Input, SimpleChanges } from "@angular/core";

let clicks: number = 0;
@Component({template: '<h1>H1 tag</h1>'})
export class BaseButton {
    @HostListener('click')
    handleClick() {
      clicks++;
      console.log('clicks ', clicks);
    }
  }

  @Component({selector: '[sub-button]', template: '<ng-content></ng-content>'})
  export class SubButton extends BaseButton {
  }

  @Component({
    selector: 'parent-host',
    template: '<button sub-button>Click me</button>'})
  export class ParentHost {
  }


//   different

@Directive({selector: '[color],[margin]',
host: {
    '[style.background-color]': '"yellow"',
  }
})
export class ElDecorator {
  @Input() color?: string;
  @Input() margin?: number;
  @HostBinding('style.background-color')
  backgroundColor:string = 'yellow';
    ngOnChanges(changes: SimpleChanges): void {
        if(changes && changes['color']){
            this.backgroundColor = this.color || '';
        }
    }
 }
@Component({
  selector: 'card',
  template: `
    <ng-content select="[card-title]"></ng-content>
    ---
    <ng-content select="[card-subtitle]"></ng-content>
    ---
    <ng-content select="[card-content]"></ng-content>
    ---
    <ng-content select="[card-footer]"></ng-content>
  `
})
export class Card {
}

@Component({
  selector: 'card-with-title',
  template: `
    <card>
     <h1 [color]="'red'" [margin]="10" ngProjectAs="[card-title]">Title</h1>
     <h2  xlink:href="google.com" ngProjectAs="[card-subtitle]">Subtitle</h2>
     <div style="font-color: blue;" ngProjectAs="[card-content]">content</div>
     <div [color]="'blue'" ngProjectAs="[card-footer]">footer</div>
    </card>
  `
})
export class CardWithTitle {
}