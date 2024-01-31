// ------------------------
// -- Multi Pokemon page --
// ------------------------

export interface MultiPokemonApiResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonsListPage {
  pokemons: Pokemon[];
  nextUrl: string | null;
  prevUrl: string | null;
  indexCounter: number;
}

export interface Pokemon {
  name: string;
  url: string;
}

// -------------------------
// -- Single Pokemon Card --
// -------------------------
export interface PokemonDetailsApiResponse {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonDetails {
  name: string;
  id: number;
  image: string;
  types: string[];
}
