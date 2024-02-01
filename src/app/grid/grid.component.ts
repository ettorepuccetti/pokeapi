import { Component, Input } from '@angular/core';
import { Pokemon } from '../data/datamodel';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})
export class GridComponent {
  @Input() pokemons: Pokemon[];

  constructor() { }
}
