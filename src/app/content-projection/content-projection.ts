import { Component, ContentChildren, EventEmitter, Input, Output } from "@angular/core";

export interface Hero {
    name: string;
}

@Component({selector: 'content-projection', 
templateUrl: 'content-projection.html'
})
export class ContentProjectionComponent {

}
