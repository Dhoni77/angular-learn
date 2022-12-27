import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { Fruits, FruitsService } from '../services/fruits.service';
import { APP_SOME_ID, routeParamFactory } from './route_factory';

@Component({
  selector: 'route-main',
  templateUrl: 'routing.html'
})
export class RouterComponent {}

@Component({
  selector: 'child-route',
  template: ` <h1>In Child Route now!</h1> `
})
export class ChildRouteComponent {}

@Component({
  selector: 'route-guards',
  template: `
    <ol>
      <li>Can Activate</li>
      <li>Can Activate Child</li>
      <li>Can Load</li>
      <li>Can Deactivate</li>
      <li>Can Match</li>
      <li>Resolve</li>
    </ol>
  `
})
export class RouterGuardsDefComponent {}

@Component({
  selector: 'fruits-list',
  template: `
    <ul class="fruits">
      <li
        *ngFor="let fruits of fruits$ | async"
        [class.selected]="fruits.id === selectedId"
      >
        <a [routerLink]="[fruits.id]">
          <span class="badge">{{ fruits.id }}</span
          >{{ fruits.name }}
        </a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class FruitsComponentList {
  fruits$!: Observable<Fruits[]>;
  selectedId = 0;

  constructor(private service: FruitsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fruits$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getFruits();
      })
    );
  }
}

@Component({
  selector: 'fruits-detail',
  template: `
    <div *ngIf="fruit">
      <h3>{{ editName }}</h3>
      <p>Id: {{ fruit.id }}</p>
      <label for="fruit-name">Fruit name: </label>
      <input
        type="text"
        id="fruit-name"
        [(ngModel)]="editName"
        placeholder="name"
      />
      <div>
        <button type="button" (click)="save()">Save</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </div>
    </div>
  `
})
export class FruitsDetailComponent {
  fruit!: Fruits;
  editName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const fruit: Fruits = data['fruit'];
      this.editName = fruit.name;
      this.fruit = fruit;
    });
  }

  // #docregion cancel-save
  cancel() {
    this.gotoFruits();
  }

  save() {
    this.fruit.name = this.editName;
    this.gotoFruits();
  }
  // #enddocregion cancel-save

  // #docregion canDeactivate
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no fruit or the fruit is unchanged
    if (!this.fruit || this.fruit.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
  // #enddocregion canDeactivate

  gotoFruits() {
    const fruitId = this.fruit ? this.fruit.id : null;
    // Pass along the fruit id if available
    // so that the fruitListComponent can select that fruit.
    // Add a totally useless `foo` parameter for kicks.
    // #docregion gotoCrises-navigate
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: fruitId, foo: 'foo' }], {
      relativeTo: this.route
    });
    // #enddocregion gotoCrises-navigate
  }
}

@Component({
  selector: 'fruits-display',
  template: `
    <div *ngIf="fruits$ | async as fruit">
      <p>Fruit name: {{ fruit.name }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: APP_SOME_ID,
      useFactory: routeParamFactory('id'),
      deps: [ActivatedRoute]
    }
  ]
})
export class FruitsDisplayList {
  fruits$!: Observable<Fruits>;
  selectedId = 0;

  constructor(
    private service: FruitsService,
    @Inject(APP_SOME_ID) private readonly id$: Observable<string>
  ) {}

  ngOnInit() {
    // activatedRoute.snapshot.paramMap.get('id')
    this.id$.subscribe((id) => {
      this.fruits$ = this.service.getFruitsById(parseInt(id as string, 10));
    });
  }
}
