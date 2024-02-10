import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ITEM_PER_PAGE } from '../constants';
import {
  MultiPokemonApiResponse,
  Pokemon,
  PokemonsListPage,
  TypeApiResponse,
} from './data/datamodel';

@Injectable({
  providedIn: 'root',
})
export class MultiPokemonService {
  pokemonsByType: Observable<Pokemon[]> | null = null;

  constructor(private httpClient: HttpClient) {}

  getMultiplePokemonResponse(url: string): Observable<PokemonsListPage> {
    return this.httpClient.get<MultiPokemonApiResponse>(url).pipe(
      tap({
        next: (data) => {
          console.log('url', url, 'data', data);
        },
      }),
      map((data) => {
        return {
          count: data.count,
          pokemons: data.results,
          nextUrl: data.next,
          prevUrl: data.previous,
          indexCounter:
            (parseInt(data.results[0].url.split('/').at(-2)!) - 1) /
              ITEM_PER_PAGE +
            1,
        };
      }),
    );
  }

  offset: number = 0;

  resetOffset() {
    this.offset = 0;
  }

  incrementOffset() {
    this.offset++;
  }

  decrementOffset() {
    this.offset--;
  }

  getPokemonsByType(url: string): Observable<PokemonsListPage> {
    return this.httpClient.get<TypeApiResponse>(url).pipe(
      map((data) => {
        return data.pokemon.filter((p) => p.slot === 1).map((p) => p.pokemon);
      }),
      map((pokemons) => {
        return {
          count: pokemons.length,
          pokemons: pokemons.slice(
            this.offset * ITEM_PER_PAGE,
            (this.offset + 1) * ITEM_PER_PAGE,
          ),
          nextUrl:
            pokemons.length > (this.offset + 1) * ITEM_PER_PAGE ? url : null,
          prevUrl: this.offset > 0 ? url : null,
          indexCounter: this.offset + 1,
        };
      }),
    );
  }
}
