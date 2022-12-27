import { Component, ContentChildren, Input, QueryList, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { TextDirective } from "./content";

@Component({selector: 'needs-content', template: '<ng-content></ng-content>'})
export class NeedsContentComponent {
  // children with #content local variable
  @ContentChildren('content') children: any;

  ngAfterContentInit() {
    // contentChildren is set
    console.log('children ', this.children);
    this.children.map((c: any) => console.log(c));
  }
}

@Component({
    selector: 'child-1',
    template: '<span>Child-1({{text}})</span>'
  })
  export class Child1Component {
    @Input() text = 'Original';
  }
  
  @Component({
    selector: 'child-2',
    template: '<div>Child-2({{text}})</div>'
  })
  export class Child2Component {
    @Input() text = '';
  }
  
  @Component({
    selector: 'child-3',
    template: '<div>Child-3({{prop}})</div>'
  })
  export class Child3Component {
    @Input() prop = '';
  }
  
  // query children

  @Component({
    selector: 'needs-query-desc',
    template: '<ng-content></ng-content><div *ngFor="let  dir of query">{{dir.text}}|</div>'
  })
  export class NeedsQueryDesc {
    // TODO(issue/24571): remove '!'.
    @ContentChildren(TextDirective, {descendants: true}) query!: QueryList<TextDirective>;

    ngAfterContentInit(){
      console.log('descendants', this.query);
    }
  }

  // ref bindings

@Component({selector: 'needs-query-by-ref-bindings', template: '<ng-content>'})
export class NeedsQueryByTwoLabels {
  // TODO(issue/24571): remove '!'.
  @ContentChildren('textLabel1,textLabel2', {descendants: true}) query!: QueryList<any>;

  ngAfterContentInit(){
    console.log('query ref: ', this.query);
  }
}

@Component({selector: 'child', template: '<div><ng-content></ng-content></div>'})
export class ChildView {
  @Input() tplRef!: TemplateRef<any>;
  @Input() name!: string;

  ngOnChanges(changes: SimpleChanges): void{
      if(changes && changes['tplRef']){
        console.log('tplRef ',changes['tplRef']);
      }
  }
}

@Component({
  selector: 'parent',
  template: `
    <ng-template #foo>
      <span>{{name}}</span>
    </ng-template>

    <child vcref [tplRef]="foo" [name]="name">
      <div>blah</div>
    </child>`
})
export class ParentView {
  name: string = 'bar';
}