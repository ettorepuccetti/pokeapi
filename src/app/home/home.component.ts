import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonsListPage } from '../data/datamodel';
import { MultiPokemonService } from '../multi-pokemon.service';

export const DEFAULT_URL: string = 'https://pokeapi.co/api/v2/pokemon/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  pokemonsListPage: PokemonsListPage | null = null;

  constructor(private dataService: MultiPokemonService) {}

  ngOnInit() {
    this.subscribeData(DEFAULT_URL);
  }

  private subscribeData(url: string) {
    this.subscriptions.push(
      this.dataService.getMultiplePokemonResponse(url).subscribe((data) => {
        this.pokemonsListPage = data;
      }),
    );
  }

  onPrev($event: string) {
    this.subscribeData($event);
  }

  onNext($event: string) {
    this.subscribeData($event);
  }

  onSearch($event: PokemonsListPage) {
    this.pokemonsListPage = $event;
  }

  onBack() {
    this.subscribeData(DEFAULT_URL);
  }

  getPokemons(): Pokemon[] {
    return this.pokemonsListPage?.pokemons ?? [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
