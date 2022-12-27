import { Directive } from "@angular/core";

@Directive({selector: '[text]', inputs: ['text'], exportAs: 'textDir'})
export class TextDirective {
  // TODO(issue/24571): remove '!'.
  text!: string;
  constructor() {}
}

