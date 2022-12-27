import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadComponent } from './lazy-load.component';
import { LazyRoutingModule } from './lazy-load.routing';

@NgModule({
  imports: [
    CommonModule,
    LazyRoutingModule
  ],
  declarations: [LazyLoadComponent]
})
export class LazyLoadModule { }
