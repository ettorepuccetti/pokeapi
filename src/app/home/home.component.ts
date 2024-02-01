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
  disableFilter: boolean = false;

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

  onPrev($url: string) {
    this.subscribeData($url);
  }

  onNext($url: string) {
    this.subscribeData($url);
  }

  onSearch($event: PokemonsListPage) {
    this.pokemonsListPage = $event;
    this.disableFilter = true;
  }

  onBack() {
    this.subscribeData(DEFAULT_URL);
    this.disableFilter = false;
  }

  getPokemons(): Pokemon[] {
    return this.pokemonsListPage?.pokemons ?? [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
