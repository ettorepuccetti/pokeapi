import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
          pokemons: data.results,
          nextUrl: data.next,
          prevUrl: data.previous,
          indexCounter:
            (parseInt(data.results[0].url.split('/').at(-2)!) - 1) / 20 + 1,
        };
      }),
    );
  }
  // this.pokemons = apiResponse.pipe(
  //   map((data) => {
  //     return data.results;
  //   }),
  // );
  // this.nextUrl = apiResponse.pipe(
  //   map((data) => {
  //     return data.next;
  //   }),
  // );
  // this.prevUrl = apiResponse.pipe(
  //   map((data) => {
  //     return data.previous;
  //   }),
  // );
  // this.indexCounter = apiResponse.pipe(
  //   map((data) => {
  //     const firstElementIndex: string = data.results[0].url
  //       .split('/')
  //       .at(-2)!;
  //     return (parseInt(firstElementIndex) - 1) / 20 + 1;
  //   }),
  // );
}
