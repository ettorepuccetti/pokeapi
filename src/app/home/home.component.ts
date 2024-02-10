import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonsListPage } from '../data/datamodel';
import { MultiPokemonService } from '../multi-pokemon.service';
import { TypeInfo } from '../type-filter/type-filter.component';

export const DEFAULT_URL: string = 'https://pokeapi.co/api/v2/pokemon/';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  pokemonsListPage: PokemonsListPage | null = null;
  disableFilter: boolean = false;
  filterInfo: TypeInfo | null = null;

  constructor(private dataService: MultiPokemonService) {}

  ngOnInit() {
    this.subscribePokemonsUnfiltered(DEFAULT_URL);
  }

  private subscribePokemonsUnfiltered(url: string) {
    this.subscriptions.push(
      this.dataService.getMultiplePokemonResponse(url).subscribe((data) => {
        this.pokemonsListPage = data;
      }),
    );
  }

  private subscribePokemonsByType() {
    if (!this.filterInfo) {
      throw new Error('Filter info is null');
    }
    this.subscriptions.push(
      this.dataService
        .getPokemonsByType(this.filterInfo.url)
        .subscribe((data) => {
          this.pokemonsListPage = data;
        }),
    );
  }

  onFilterChange($typeInfo: TypeInfo) {
    this.filterInfo = $typeInfo;
    this.dataService.resetOffset();
    if ($typeInfo.name === 'ALL') {
      this.filterInfo = null;
      this.subscribePokemonsUnfiltered(DEFAULT_URL);
    } else {
      this.subscribePokemonsByType();
    }
  }

  onPrev($url: string) {
    if (this.filterInfo) {
      this.dataService.decrementOffset();
      this.subscribePokemonsByType();
    } else {
      this.subscribePokemonsUnfiltered($url);
    }
  }

  onNext($url: string) {
    if (this.filterInfo) {
      this.dataService.incrementOffset();
      this.subscribePokemonsByType();
    } else {
      this.subscribePokemonsUnfiltered($url);
    }
  }

  onSearch($event: PokemonsListPage) {
    this.pokemonsListPage = $event;
    this.disableFilter = true;
  }

  onBack() {
    this.subscribePokemonsUnfiltered(DEFAULT_URL);
    this.disableFilter = false;
  }

  getPokemons(): Pokemon[] {
    return this.pokemonsListPage?.pokemons ?? [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
