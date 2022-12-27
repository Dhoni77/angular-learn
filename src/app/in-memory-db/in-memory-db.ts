import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { People, PeopleService } from '../services/people.service';
import { uuid } from '../utils/uuid';

@Component({
  selector: 'in-db',
  templateUrl: './in-memory-db.html'
})
export class InMemoryExample {
  peoples: People[] = [];
  peopleName: string = '';
  editPeople: People | undefined;

  constructor(public people: PeopleService) {}

  @ViewChild('peopleEditInput')
  set peopleEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.people
      .getPeopleFromUrl()
      .subscribe((peoples) => (this.peoples = peoples));
    console.log(this.peoples);
  }

  addPeople(people: string) {
    const obj: People = {
      id: uuid(),
      name: people
    };
    this.people.addPeople(obj).subscribe((people) => this.peoples.push(people));
  }

  edit(people: string) {
    return this.updatePeople(people);
  }

  updatePeople(people: string) {
    this.people
      .updatePeople({
        id: this.editPeople?.id || uuid(),
        name: people
      })
      .subscribe((people) => {
        const ix = people
          ? this.peoples.findIndex((p) => p.id === people.id)
          : -1;
        if (ix > -1) {
          this.peoples[ix] = people;
        }
        this.editPeople = undefined;
      });
  }

  deletePeople(id: string) {
    this.peoples = this.peoples.filter((p) => p.id !== id);
    this.people.deletePeople(id).subscribe();
  }
}
