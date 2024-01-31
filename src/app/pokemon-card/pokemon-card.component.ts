import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonDetails } from '../data/datamodel';
import { SinglePokemonService } from '../single-pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input() url: string;
  pokemonDetails: PokemonDetails | null = null;
  subscriptions: Subscription[] = [];

  constructor(private singlePokemonService: SinglePokemonService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.singlePokemonService
        .getPokemonDetails(this.url)
        .subscribe((pokemonDetails) => {
          this.pokemonDetails = pokemonDetails;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
