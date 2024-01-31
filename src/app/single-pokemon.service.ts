import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonDetails, PokemonDetailsApiResponse } from './data/datamodel';

@Injectable({
  providedIn: 'root',
})
export class SinglePokemonService {
  pokemonDetails: Observable<PokemonDetails> | null = null;

  constructor(private httpClient: HttpClient) {}

  getPokemonDetails(url: string) {
    return this.httpClient.get<PokemonDetailsApiResponse>(url).pipe(
      map((data) => {
        return {
          name: data.name,
          id: data.id,
          image: data.sprites.front_default,
          types: data.types.map((type) => type.type.name),
        };
      }),
    );
  }
}
