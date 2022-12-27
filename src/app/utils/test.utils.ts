import { Component, Type } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata
} from '@angular/core/testing';

export interface TestModule {
  component: any[];
  providers: any[];
  declarations: any[];
}

export async function initTestModule(
  declarations?: any[],
  providers?: any[],
  imports?: any[]
): Promise<void> {
  let testMetaData: TestModuleMetadata = {};

  if (typeof declarations !== 'undefined') {
    testMetaData['declarations'] = declarations;
  }

  if (providers !== undefined) {
    testMetaData['providers'] = providers;
  }

  if (imports !== undefined) {
    testMetaData['imports'] = imports;
  }
  await TestBed.configureTestingModule(testMetaData).compileComponents();
}

export function createTestComponent<T>(
  component: Type<T>
): ComponentFixture<T> {
  let fixture: ComponentFixture<T>;
  fixture = TestBed.createComponent(component);
  return fixture;
}
