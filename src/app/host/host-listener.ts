import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'host-listener',
  templateUrl: './host-listener.html'
})
export class HostListenerComponent {}

@Component({
  selector: 'event-listener',
  template: ` <div>
    <p>Click anywhere on document!</p>
    <button>Click!</button>
  </div>`
})
export class EventComponent {
  @HostListener('document:click') onClickDoc(): void {
    console.log('onClickDoc');
  }

  @HostListener('click', ['$event']) onClick(e: any) {
    console.log('onClick ', e);
  }

  // we only get the target element ie (<button>Click!</button>)
  //   @HostListener('click', ['$event.target'])
  //   targetClick(target: any): void {
  //     console.log('targetClick ', target);
  //   }

  /*
    @HostListener('keydown', ['$event'])
    @HostListener('window:resize', ['$event'])
    @HostListener('document:keydown.ArrowUp', ['$event'])
    @HostListener('document:keydown.ArrowDown', ['$event'])
    @HostListener('document:keydown.ArrowLeft', ['$event'])
    @HostListener('document:keydown.ArrowRight', ['$event'])
    @HostListener('window:resize', ['$event.target.innerWidth'])
    @HostListener('focusin', ['$event.target'])
    @HostListener('click', ['$event.target', '$event.button', '$event.ctrlKey', '$event.metaKey', '$event.altKey'])
    @HostListener('window:scroll')
    @HostListener('document:keyup', ['$event.key', '$event.which'])
    @HostListener('input', ['$event.target.value'])
    @HostListener('mouseenter') 
    @HostListener('mouseleave')
    @HostListener(
      'click',
      ['$event.button', '$event.ctrlKey', '$event.shiftKey', '$event.altKey', '$event.metaKey'])
    
    host binging myAnimation => host_binding_spec.ts
  */
}
