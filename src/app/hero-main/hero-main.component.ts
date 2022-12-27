import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-main',
  templateUrl: './hero-main.component.html',
  styleUrls: ['./hero-main.component.css']
})
export class HeroMainComponent implements OnInit {
  @Input() hero!: Hero;
  constructor() { }

  ngOnInit() {
  }

}
