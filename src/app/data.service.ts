import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Pokemon } from './home/home.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pokemons: Observable<Pokemon[]> | null = null;
  nextUrl: Observable<string> | null = null;
  prevUrl: Observable<string> | null = null;
  indexCounter: Observable<number> | null = null;

  defaultUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  currentUrl: string = this.defaultUrl;

  constructor(private httpClient: HttpClient) {}

  setCurrentUrl(url: string = this.defaultUrl) {
    this.currentUrl = url;
    const apiResponse = this.httpClient.get<PokeApiResponse>(url).pipe(
      tap({
        next: (data) => {
          console.log(data);
        },
      }),
    );
    this.pokemons = apiResponse.pipe(
      map((data) => {
        return data.results;
      }),
    );
    this.nextUrl = apiResponse.pipe(
      map((data) => {
        return data.next;
      }),
    );
    this.prevUrl = apiResponse.pipe(
      map((data) => {
        return data.previous;
      }),
    );

    this.indexCounter = apiResponse.pipe(
      map((data) => {
        const firstElementIndex: string = data.results[0].url
          .split('/')
          .at(-2)!;
        console.log(firstElementIndex);
        return (parseInt(firstElementIndex) - 1) / 20 + 1;
      }),
    );
  }

  public getPokemon() {
    if (!this.pokemons) {
      throw new Error('Call setCurrentUrl() first');
    }
    return this.pokemons;
  }

  getNextUrl() {
    if (!this.nextUrl) {
      throw new Error('Call setCurrentUrl() first');
    }
    return this.nextUrl;
  }

  getPrevUrl() {
    if (!this.prevUrl) {
      throw new Error('Call setCurrentUrl() first');
    }
    return this.prevUrl;
  }

  getCounter() {
    if (!this.indexCounter) {
      throw new Error('Call setCurrentUrl() first');
    }
    return this.indexCounter;
  }
}

export interface PokeApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
