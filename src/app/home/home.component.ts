import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITEM_PER_PAGE } from '../../constants';
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

  onPrev() {
    if (!this.pokemonsListPage?.prevUrl) {
      throw new Error('Button should be disabled');
    }
    this.subscribeData(this.pokemonsListPage.prevUrl);
  }

  onNext() {
    if (!this.pokemonsListPage?.nextUrl) {
      throw new Error('Button should be disabled');
    }
    this.subscribeData(this.pokemonsListPage.nextUrl);
  }

  isPrevDisabled(): boolean {
    return !this.pokemonsListPage?.prevUrl;
  }

  isNextDisabled(): boolean {
    return !this.pokemonsListPage?.nextUrl;
  }

  getCounter(): number {
    return this.pokemonsListPage?.indexCounter ?? 1;
  }

  getMaxCounter(): number {
    const count:number = this.pokemonsListPage?.count ?? ITEM_PER_PAGE;
    return Math.ceil(count / ITEM_PER_PAGE);
  }

  getPokemons(): Pokemon[] {
    return this.pokemonsListPage?.pokemons ?? [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
