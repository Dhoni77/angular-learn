import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroMainComponent } from './hero-main/hero-main.component';
import { HeroChildComponent } from './hero-child/hero-child.component';
import { HeroChild2Component } from './hero-child2/hero-child2.component';
import { AppZippyProjectasComponent } from './content-projection/app-zippy-projectas/app-zippy-projectas.component';
import {
  Child1Component,
  Child2Component,
  Child3Component,
  ChildView,
  NeedsContentComponent,
  NeedsQueryByTwoLabels,
  NeedsQueryDesc,
  ParentView
} from './content-projection/content-children';
import { ContentProjectionComponent } from './content-projection/content-projection';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';
import { TextDirective } from './content-projection/content';
import {
  BindingInputExample,
  EmbeddedComponent,
  IncrementComp,
  Insertion,
  MyViewChild,
  NeedsViewChildrenWithRead,
  QueryComp,
  Required,
  SubComp,
  TemplateOutletExample,
  ViewComp,
  Viewing
} from './content-projection/viewchild';
import {
  BaseButton,
  Card,
  CardWithTitle,
  ElDecorator,
  ParentHost,
  SubButton
} from './content-projection/host-listener';
import {
  AliasingComponent,
  EventEmitterHierarchy,
  EventEmitterVoid,
  MyEventEmitter,
  MyEventParent,
  SizerComponent,
  TwoWayBindingEvent
} from './event-emitters/event-emitter';
import { MyForms, MyReactiveFormGroup } from './forms/forms';
import { AppRoutingModule } from './app-routing.module';
import {
  ChildRouteComponent,
  FruitsComponentList,
  FruitsDetailComponent,
  FruitsDisplayList,
  RouterComponent,
  RouterGuardsDefComponent
} from './routing/routing';
import { AuthService } from './services/Auth.service';
import { AuthGuard } from './routing/guards/auth.guard';
import { MyResolverService } from './services/MyResolver.service';
import { CanDeactivateGuard } from './routing/guards/can-deactivate.guard';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/InMemoryData.service';
import { InMemoryExample } from './in-memory-db/in-memory-db';
import { FruitsService } from './services/fruits.service';
import { PeopleService } from './services/people.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './interceptors/noop.interceptor';
import { EnsureHttpsInterceptor } from './interceptors/ensure-https.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import {
  CompWithHostBindingComponent,
  HostBindComponent,
  HostBindDirEx,
  HostComponent,
  MyColor
} from './host/host';
import { ElementWithRenderer, MyRenderer } from './renderer-2/renderer-2';
import { EventComponent, HostListenerComponent } from './host/host-listener';

const view_child_component = [
  MyViewChild,
  ViewComp,
  SubComp,
  QueryComp,
  Required,
  Viewing,
  Insertion,
  NeedsViewChildrenWithRead,
  EmbeddedComponent,
  IncrementComp,
  BindingInputExample,
  TemplateOutletExample
];

const content_children_component = [
  AppZippyProjectasComponent,
  NeedsContentComponent,
  Child1Component,
  Child2Component,
  Child3Component,
  ContentProjectionComponent,
  TextDirective,
  NeedsQueryDesc,
  NeedsQueryByTwoLabels,
  ParentView,
  ChildView
];

const event_emitter = [
  MyEventEmitter,
  MyEventParent,
  AliasingComponent,
  TwoWayBindingEvent,
  SizerComponent,
  EventEmitterVoid,
  EventEmitterHierarchy
];

const host_listener = [
  ParentHost,
  BaseButton,
  SubButton,
  Card,
  CardWithTitle,
  ElDecorator,
  HostListenerComponent,
  EventComponent
];

const host_binding = [
  HostBindComponent,
  HostComponent,
  CompWithHostBindingComponent,
  MyColor,
  HostBindDirEx
];

const renderer = [MyRenderer, ElementWithRenderer];

const form_component = [MyForms, MyReactiveFormGroup];

const route_component = [
  RouterComponent,
  ChildRouteComponent,
  RouterGuardsDefComponent,
  FruitsComponentList,
  FruitsDetailComponent,
  FruitsDisplayList
];

const services = [AuthService, MyResolverService, FruitsService, PeopleService];

const guards = [AuthGuard, CanDeactivateGuard];

const interceptor_providers = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
];

const in_memory_db = [InMemoryExample];

@NgModule({
  declarations: [
    AppComponent,
    HeroMainComponent,
    HeroChildComponent,
    HeroChild2Component,
    ...content_children_component,
    ...view_child_component,
    ...host_listener,
    ...host_binding,
    ...event_emitter,
    ...form_component,
    ...route_component,
    ...in_memory_db,
    ...renderer
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
    })
  ],
  providers: [...services, ...guards, ...interceptor_providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
