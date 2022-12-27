import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadComponent } from './lazy-load.component';

const routes: Routes = [
  { path: '', component: LazyLoadComponent, title: 'Lazy Loaded Component' },
];

const LazyLoadRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [LazyLoadRoutes],
  exports: [RouterModule]
})
export class LazyRoutingModule { }