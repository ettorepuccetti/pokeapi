import { Component, Input } from '@angular/core';
import { Pokemon } from '../data/datamodel';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() pokemons: Pokemon[];

  constructor() { }
}
