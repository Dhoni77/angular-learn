// /* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { initTestModule } from '../utils/test.utils';
import { People, PeopleService } from './people.service';
import { HttpClient } from '@angular/common/http';

const peopleUrl: string = 'api/peoples';

describe('Service: People', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let peopleService: PeopleService;
  beforeEach(async () => {
    initTestModule(undefined, [PeopleService], [HttpClientTestingModule]);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    peopleService = TestBed.inject(PeopleService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('test get request', () => {
    const peopleData: People[] = [
      {
        id: 'a',
        name: 'John'
      },
      {
        id: 'b',
        name: 'Bob'
      }
    ];

    httpClient.get(peopleUrl).subscribe((data) => {
      expect(data).toEqual(peopleData);
    });

    const req = httpTestingController.expectOne(peopleUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(peopleData);
  });

  it('test get request for service', () => {
    const peopleData: People[] = [
      {
        id: 'a',
        name: 'John'
      },
      {
        id: 'b',
        name: 'Bob'
      }
    ];

    peopleService.getPeopleFromUrl().subscribe((data) => {
      expect(data).toEqual(peopleData);
    });

    const req = httpTestingController.expectOne(peopleUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(peopleData);
  });

  it('test post request', () => {
    const peopleData: People = {
      id: 'a',
      name: 'John'
    };

    httpClient
      .post(peopleUrl, peopleData)
      .subscribe((data) => expect(data).toEqual(peopleData));

    const req = httpTestingController.expectOne(peopleUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(peopleData);
  });

  it('test put request', () => {
    const peopleData: People = {
      id: 'a',
      name: 'John'
    };

    httpClient
      .put(peopleUrl, peopleData)
      .subscribe((data) => expect(data).toEqual(peopleData));

    const req = httpTestingController.expectOne(peopleUrl);
    expect(req.request.method).toEqual('PUT');

    req.flush(peopleData);
  });

  it('test delete request', () => {
    httpClient.delete(`${peopleUrl}/a`).subscribe();

    const req = httpTestingController.expectOne(`${peopleUrl}/a`);
    expect(req.request.method).toEqual('DELETE');
  });
});
