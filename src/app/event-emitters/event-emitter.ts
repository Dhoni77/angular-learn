import { Component, Directive, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

/*
 Component outputs are dispatched as HTML [Custom Events](https://developer.mozilla.org/docs/Web/API/CustomEvent), with the name of the custom event matching the output name.
    For example, for a component with `@Output() valueChanged = new EventEmitter()`, the corresponding custom element dispatches events with the name "valueChanged", and the emitted data is stored on the event's `detail` property.
    If you provide an alias, that value is used; for example, `@Output('myClick') clicks = new EventEmitter<string>();` results in dispatch events with the name "myClick".
*/

@Component({
    selector: 'event-emitter',
    templateUrl: 'event-emitter.html'
})
export class MyEventEmitter {
    textEventFromHierarchy = ''
    emitEventFromHtmll(e: any) {
        console.log('emitEventFromHtml', e);
        this.textEventFromHierarchy = 'From @Output event hierarchy';
    }
}

// void eventEmitter

@Component({
    selector: 'event-emitter-void',
    template: `
        <button (click)="dismiss.next()">Click to emit an event</button>
    `
})
export class EventEmitterVoid {
    @Output() dismiss = new EventEmitter<void>();
    @Output() onDismiss = this.dismiss.pipe(distinctUntilChanged(), debounceTime(500));
    @Output() assignEvent = new EventEmitter<boolean>();
    ngOnInit() : void {
        this.dismiss.next();
    }
}

@Component({
    selector: 'event-emitter-hierarchy',
    template: ''
})
export class EventEmitterHierarchy {
    @Output() emitEventFromHtml = new EventEmitter<string>();
}

@Component({
    selector: 'parent-comp-event',
    template: `
    <event-emitter-void (dismiss)="fromVoidEmitter()" (onDismiss)="fromSubject()" (assignEvent)="assignedEvent = $event" ></event-emitter-void>
    <event-emitter-hierarchy (emitEventFromHtml)="emitEventFromHtml.emit('Hello there')"></event-emitter-hierarchy>
    <app-aliasing
    [saveForLaterItem]="currentItem"
    [wishListItem]="currentItem"
    (aliasFromOutputs)="fromChildPropertyAlias($event)"
    (wishEvent)="fromChildOutputAlias($event)">
  </app-aliasing>
  <div>
  <p>
  Received events from child via @Output emitter
  </p>
  <p>
    From child output alias: {{ cOutputAlias }}
  </p>
    <p>
        From child property alias: {{ cPropertyAlias }}
    </p>
    <p> {{ text }} </p>
    <p> {{ textSub }} </p>
    <p> From @Output Directive </p>
    <p> {{ textDirective }} </p>
  </div>
    `
})
export class MyEventParent {
    @Output() emitEventFromHtml = new EventEmitter<any>();
    currentItem: string = 'Hi from Parent';
    cOutputAlias: string = '';
    cPropertyAlias: string = '';
    text = '';
    textSub = '';
    textDirective: string = '';
    assignedEvent = false;
    name: string = '';
    textEventFromHierarchy: string = '';

    emitEventFromHtmll(e: any) {
        console.log('emitEventFromHtml', e);
        this.textEventFromHierarchy = 'From @Output event hierarchy';
    }

    fromVoidEmitter() {
        this.text = 'From void Emitter';
    }

    fromChildPropertyAlias(e: string) {
        this.cPropertyAlias = e;
    }

    fromChildOutputAlias(e: string) {
        this.cOutputAlias = e;
    }

    fromSubject() {
        this.textSub = 'From Subject stream and emitted through @Output';
    }
}

// Alias Events
@Component({
    selector: 'app-aliasing',
    template: `
        <h1>Aliasing Events</h1>
        <div>
            <div>
                <p>Property Name Alias:</p>
                <p>Input property alias: {{input1}}</p>
            </div>
            <div>
                <p>@Input Alias: {{ input2 }}</p>
            </div>
        </div>
    `,
    inputs: ['input1: saveForLaterItem'], // propertyName:alias
    outputs: ['outputEvent1: aliasFromOutputs']
  })
  export class AliasingComponent {
    input1 = '';
    outputEvent1: EventEmitter<string> = new EventEmitter<string>();
    @Input('wishListItem') input2 = ''; //  @Input(alias)
    @Output('wishEvent') outputEvent2 = new EventEmitter<string>(); //  @Output(alias) propertyName = ...
    ngOnInit() {
        console.warn('Child says: emitting outputEvent1 with', this.input1);
        this.outputEvent1.emit(this.input1);
        console.warn('Child says: emitting outputEvent2', this.input2);
        this.outputEvent2.emit(this.input2);
    }
  }

//   @Output use case with forms

@Component({
selector: 'output-form',
template: `
<h2>Child component with @Output()</h2>
<!-- #docregion child-output -->
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>
<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
<!-- #enddocregion child-output -->
`
})
export class OutputForm
{
    addNewItem(value: string) {
        console.log('Value from form', value);
    }
}

// Two way binding

@Component({
    selector: 'two-way-binding',
  template: `
  <h1>Two way binding events</h1>
  <app-sizer [(size)]="fontSizePx"></app-sizer>
  `  
})
export class TwoWayBindingEvent {
    fontSizePx: number = 16;
}

@Component({
    selector: 'app-sizer',
    template: `
    <div>
    <button type="button" (click)="dec()" title="smaller">-</button>
    <button type="button" (click)="inc()" title="bigger">+</button>
    <span [style.font-size.px]="size">FontSize: {{size}}px</span>
  </div>
    `
})
export class SizerComponent {
    @Input()  size!: number | string;
    @Output() sizeChange = new EventEmitter<number>();
  
    dec() { this.resize(-1); }
    inc() { this.resize(+1); }
  
    resize(delta: number) {
      this.size = Math.min(40, Math.max(8, +this.size + delta));
      this.sizeChange.emit(this.size);
    }
  }

