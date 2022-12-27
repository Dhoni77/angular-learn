/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroChildComponent } from './hero-child.component';
import { createTestComponent, initTestModule } from '../utils/test.utils';

describe('HeroChildComponent', () => {
  let component: HeroChildComponent;
  let fixture: ComponentFixture<HeroChildComponent>;

  beforeEach(async () => {
    initTestModule([HeroChildComponent], undefined, undefined);
  });

  beforeEach(() => {
    fixture = createTestComponent(HeroChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text in p tags', () => {
    let pTag: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pTag.textContent).toContain('hero-child works!');
  });
});
