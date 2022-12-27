import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

let resolvedPromise = Promise.resolve(null);

describe('Test using fakeAsync', () => {
  it('should run asynchronous code', fakeAsync(() => {
    let thenRan = false;
    resolvedPromise.then(() => {
      thenRan = true;
    });
    expect(thenRan).toEqual(false);
    flushMicrotasks();
    expect(thenRan).toEqual(true);
  }));

  it('should run queued zero duration timer on zero tick', fakeAsync(() => {
    let ran = false;
    setTimeout(() => {
      ran = true;
    }, 0);

    expect(ran).toEqual(false);
    tick();
    expect(ran).toEqual(true);
  }));

  it('should run queued timer after sufficient clock ticks', fakeAsync(() => {
    let ran = false;
    setTimeout(() => {
      ran = true;
    }, 10);

    tick(6);
    expect(ran).toEqual(false);

    tick(6);
    expect(ran).toEqual(true);
  }));

  it('should flush multiple tasks', fakeAsync(() => {
    let ran = false;
    let ran2 = false;
    setTimeout(() => {
      ran = true;
    }, 10);
    setTimeout(() => {
      ran2 = true;
    }, 30);

    let elapsed = flush();

    expect(ran).toEqual(true);
    expect(ran2).toEqual(true);
    expect(elapsed).toEqual(30);
  }));
});
