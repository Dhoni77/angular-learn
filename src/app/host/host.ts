import { Component, Directive, HostBinding } from '@angular/core';

/*

Host binding style precedence
style-precedence.md
*/

@Component({
  selector: 'host',
  templateUrl: './host.html'
})
export class HostComponent {}

@Component({
  selector: 'host-bind',
  templateUrl: './host-bind.html'
})
export class HostBindComponent {}

@Component({
  selector: 'comp-with-host-binding',
  template: `<div>
    <p class="special" [style.width]="myWidth" id="{{ label }}">
      I am a component with host binding!
    </p>
  </div>`,
  styles: [
    `
      div {
        display: block;
      }

      .special {
        background-color: red;
      }
    `
  ]
})
export class CompWithHostBindingComponent {
  @HostBinding('class.special')
  isSpecial = true;

  @HostBinding('style.color')
  color = '#3797e3';

  @HostBinding('style')
  myStyle = {
    display: 'block',
    width: '50%',
    height: '50%'
  };

  @HostBinding('id') id = 'my-id';

  myWidth = '50%';
  label: string = 'label';
}

// Host binding using directive

@Directive({
  selector: '[my-color-dir]'
})
export class MyColor {
  @HostBinding('style.color') color = 'red';
}

@Component({
  selector: 'host-bind-dir-ex',
  template: `
    <div my-color-dir>Hi, I am colored using host bind directive!</div>
    <div class="my-color">Hi, I am colored using host!</div>
  `,
  styles: [
    `
      .my-color {
        color: #cc23cdc2;
      }
    `
  ],
  host: {
    '[class.my-color]': 'isColor'
  }
})
export class HostBindDirEx {
  isColor: boolean = true;
}
