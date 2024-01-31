import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ITEM_PER_PAGE } from '../constants';
import {
  MultiPokemonApiResponse,
  Pokemon,
  PokemonsListPage,
} from './data/datamodel';

@Injectable({
  providedIn: 'root',
})
export class MultiPokemonService {
  pokemons: Observable<Pokemon[]> | null = null;
  nextUrl: Observable<string> | null = null;
  prevUrl: Observable<string> | null = null;
  indexCounter: Observable<number> | null = null;

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
}
