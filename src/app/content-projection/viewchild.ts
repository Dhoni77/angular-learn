import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EmbeddedViewRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { TextDirective } from './content';

@Component({
  selector: 'view-child',
  templateUrl: 'view-child.html'
})
export class MyViewChild {}

@Component({ selector: 'sub-comp', template: '<ng-content></ng-content>' })
export class SubComp {
  @ContentChild('Token', { read: 'Token' }) token: any;

  ngAfterContentInit() {
    console.log('content initialization for sub component');
  }

  ngAfterContentChecked() {
    console.log('content checked ', this.token);
  }
}

@Component({
  selector: 'view-comp',
  template: `
    <sub-comp>
      <div text-token #Token></div>
    </sub-comp>
  `
})
export class ViewComp {
  @ViewChild(SubComp) subComp!: SubComp;

  ngAfterViewInit() {
    this.subComp.token = 'token initialized successfully';
    console.log('sub component ', this.subComp);
  }
}

@Component({
  selector: 'local-ref-query-component',
  template: '<ng-content></ng-content>'
})
export class QueryComp {
  @ViewChild('viewQuery') viewChild!: any;
  @ContentChild('contentQuery') contentChild!: any;

  @ViewChildren('viewQuery') viewChildren!: QueryList<any>;
  @ContentChildren('contentQuery') contentChildren!: QueryList<any>;

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked local-ref ', this.contentChild);
    console.log(
      'ngAfterContentChecked local-ref content childrens',
      this.contentChildren
    );
  }
}

// ngTemplateOutlet
@Component({ selector: 'required', template: '<h1>Hello!</h1>' })
export class Required {}

@Component({
  selector: 'insertion',
  template: `<ng-container [ngTemplateOutlet]="content"></ng-container>`
})
export class Insertion {
  @Input() content!: TemplateRef<{}>;
}

// ngTemplateOutlet 2

@Component({
  selector: 'template-out',
  template: `
    <ng-container
      *ngTemplateOutlet="
        myTemplate;
        context: { showLabel: true, value: 'Apple', title: 'NgTemplateOutlet' }
      "
    ></ng-container>
    <ng-container
      *ngTemplateOutlet="
        myTemplate;
        context: {
          showLabel: false,
          value: 'Banana',
          title: 'NgTemplateOutlet'
        }
      "
    ></ng-container>
    <ng-container
      *ngTemplateOutlet="mytpl; context: { $implicit: 'Hello', myvar: 'World' }"
    ></ng-container>
    <ng-template
      #myTemplate
      let-showLabel="showLabel"
      let-value="value"
      let-title="title"
    >
      <span *ngIf="showLabel"
        ><h1>
          <strong>{{ label }}</strong>
        </h1></span
      >
      <span *ngIf="showSymbol" class="symbol {{ value }}"></span>
      <br />
      <span>{{ value }}</span>
      <br />
      <span>{{ title }}</span>
    </ng-template>
    <ng-template #mytpl let-name let-myvar="myvar">
      <br />
      <span>{{ name }}</span>
      <br />
      <span>{{ myvar }}</span>
    </ng-template>
  `
})
export class TemplateOutletExample {
  label: string = 'Template Outlet Example';
  showSymbol: boolean = true;
}

/*
create a #variable and then add component / html into the template container and 
pass the ref #variable as an input property to the desired component and use 
a ng-container with [ngTemplateOutlet] and project the content using the variable
*/

@Component({
  selector: 'viewing-insertion',
  template: `
    <ng-template #template>
      <div>Hi template!</div>
      <required></required>
    </ng-template>
    <insertion [content]="template"></insertion>
    <template-out></template-out>
  `
})
export class Viewing {
  @ViewChild(Required) requiredEl!: Required;
  ngAfterViewInit() {
    console.log('Required el: ' + this.requiredEl);
  }
}

@Component({
  selector: 'needs-view-children-read',
  template: '<div #q text="va"></div><div #w text="vb"></div>'
})
export class NeedsViewChildrenWithRead {
  // TODO(issue/24571): remove '!'.
  @ViewChildren('q,w', { read: TextDirective })
  textDirChildren!: QueryList<TextDirective>;
  // TODO(issue/24571): remove '!'.

  ngAfterViewInit(): void {
    console.log(
      'ViewChildren with read and 2 template variables: ' +
        JSON.stringify(this.textDirChildren)
    );
  }
}

// create embedded view

let _counter = 0;

@Component({
  selector: 'increment-comp',
  template: `<span>created{{ counter }}</span>`
})
export class IncrementComp {
  counter = _counter++;
}

@Component({
  selector: 'embedded-comp',
  template: `
    <ng-template #simple><increment-comp></increment-comp></ng-template>
    <div #container></div>
  `
})
export class EmbeddedComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef = null!;

  @ViewChild('simple', { read: TemplateRef, static: true })
  simple: TemplateRef<any> = null!;

  view0: EmbeddedViewRef<any> = null!;
  view1: EmbeddedViewRef<any> = null!;
  view2: EmbeddedViewRef<any> = null!;
  view3: EmbeddedViewRef<any> = null!;

  constructor(public changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // insert at the front
    debugger;
    this.view1 = this.container.createEmbeddedView(this.simple); // "created0"

    // insert at the front again
    this.view0 = this.container.createEmbeddedView(this.simple, {}, 0); // "created1"

    // insert at the end
    this.view3 = this.container.createEmbeddedView(this.simple); // "created2"

    // insert in the middle
    this.view2 = this.container.createEmbeddedView(this.simple, {}, 2); // "created3"

    // We need to run change detection here to avoid
    // ExpressionChangedAfterItHasBeenCheckedError because of the value updating in
    // increment-comp
    this.changeDetector.detectChanges();
  }
}

@Component({
  selector: 'binding-input-eg',
  template: `
    <label
      >HTML Attribute Initializes to "Sarah":
      <input type="text" value="Sarah" #bindingInput
    /></label>
    <button type="button" (click)="getHTMLAttributeValue()">
      Get HTML attribute value
    </button>
    Won't change
    <button type="button" (click)="getDOMPropertyValue()">
      Get DOM property value
    </button>
    Changeable. Angular works with these.
  `
})
export class BindingInputExample {
  @ViewChild('bindingInput') bindingInput!: ElementRef;

  getHTMLAttributeValue(): any {
    console.warn(
      'HTML attribute value: ' +
        this.bindingInput.nativeElement.getAttribute('value')
    );
  }

  getDOMPropertyValue(): any {
    // this.bindingInput.nativeElement.value = 'Ajay'
    console.warn(
      'DOM property value: ' + this.bindingInput.nativeElement.value
    );
  }
}
