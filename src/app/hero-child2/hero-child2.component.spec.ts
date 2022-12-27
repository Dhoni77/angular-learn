/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroChild2Component } from './hero-child2.component';

describe('HeroChild2Component', () => {
  let component: HeroChild2Component;
  let fixture: ComponentFixture<HeroChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
