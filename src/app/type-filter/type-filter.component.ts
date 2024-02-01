import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
})
export class TypeFilterComponent {
  @Input() disabled: boolean;

  types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
  ];

  handleFilterChange($event: string) {
    console.log($event);
  }
}
