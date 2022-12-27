import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyViewChild } from './content-projection/viewchild';
import { ContentProjectionComponent } from './content-projection/content-projection';
import { MyEventEmitter } from './event-emitters/event-emitter';
import { AppComponent } from './app.component';
import {
  ChildRouteComponent,
  FruitsComponentList,
  FruitsDetailComponent,
  FruitsDisplayList,
  RouterComponent,
  RouterGuardsDefComponent
} from './routing/routing';
import { AuthGuard } from './routing/guards/auth.guard';
import { MyResolverService } from './services/MyResolver.service';
import { CanDeactivateGuard } from './routing/guards/can-deactivate.guard';
import { InMemoryExample } from './in-memory-db/in-memory-db';
import { HostBindComponent, HostComponent } from './host/host';
import { MyRenderer } from './renderer-2/renderer-2';
import { HostListenerComponent } from './host/host-listener';

const routes: Routes = [
  { path: 'view-child', component: MyViewChild, canActivate: [AuthGuard] },
  { path: 'content-child', component: ContentProjectionComponent },
  { path: 'event-emitter', component: MyEventEmitter },
  {
    path: 'routing',
    component: RouterComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'child-a', component: ChildRouteComponent, title: 'Child' },
      {
        path: 'child-b',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./routing/lazy-load/lazy-load.module').then(
            (module) => module.LazyLoadModule
          )
      },
      { path: 'child-c', component: RouterGuardsDefComponent },
      {
        path: 'fruits-list',
        component: FruitsComponentList,
        children: [
          {
            path: ':id',
            component: FruitsDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              fruit: MyResolverService
            }
          }
        ]
      },
      { path: 'fruits-list/:id/:id', component: FruitsDisplayList }
    ]
  },
  { path: 'in-memory-db', component: InMemoryExample },
  {
    path: 'host',
    component: HostComponent,
    children: [
      { path: 'host-binding', component: HostBindComponent },
      { path: 'host-listener', component: HostListenerComponent }
    ]
  },
  { path: 'renderer', component: MyRenderer },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // debugging purposes only
  exports: [RouterModule]
})
export class AppRoutingModule {}
