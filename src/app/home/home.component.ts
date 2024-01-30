import { Component } from '@angular/core';
import { DataService } from '../data.service';

export const DEFAULT_URL: string = 'https://pokeapi.co/api/v2/pokemon/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  pokemons: Pokemon[] = [];
  counter: number | null = null;
  nextUrl: string | null = null;
  prevUrl: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscribeData(DEFAULT_URL);
  }

  subscribeData(url: string) {
    this.dataService.setCurrentUrl(url);

    this.dataService.getPokemon().subscribe((data) => {
      this.pokemons = data;
    });

    this.dataService.getNextUrl().subscribe((data) => {
      this.nextUrl = data;
    });

    this.dataService.getPrevUrl().subscribe((data) => {
      this.prevUrl = data;
    });

    this.dataService.getCounter().subscribe((data) => {
      this.counter = data;
    });
  }

  onPrev() {
    if (!this.prevUrl) {
      throw new Error('Button should be disabled');
    }
    this.subscribeData(this.prevUrl);
  }

  onNext() {
    if (!this.nextUrl) {
      throw new Error('Button should be disabled');
    }
    this.subscribeData(this.nextUrl);
  }
}

export interface Pokemon {
  name: string;
  url: string;
}
