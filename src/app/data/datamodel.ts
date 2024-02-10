// ------------------------
// -- Multi Pokemon page --
// ------------------------

export interface MultiPokemonApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonsListPage {
  pokemons: Pokemon[];
  nextUrl: string | null;
  prevUrl: string | null;
  indexCounter: number;
  count: number;
}

export interface Pokemon {
  name: string;
  url: string;
}

// -------------------
// -- Type Response --
// -------------------

export interface TypeApiResponse {
  pokemon: { pokemon: Pokemon; slot: number }[];
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
