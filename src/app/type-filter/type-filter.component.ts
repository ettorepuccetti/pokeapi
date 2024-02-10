import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
})
export class TypeFilterComponent {
  @Input() disabled: boolean;
  @Output() filterChange: EventEmitter<TypeInfo> = new EventEmitter();

  handleFilterChange($event: string) {
    const typeUrl = Object.values(types).find((t) => t.name === $event);
    if (!typeUrl) {
      throw new Error('Type not found');
    }
    this.filterChange.emit(typeUrl);
  }

  getTypes(): string[] {
    return Object.values(types).map((t) => t.name);
  }
}

const types: { [key: number]: TypeInfo } = {
  0: { name: 'ALL', url: 'https://pokeapi.co/api/v2/pokemon/' },
  1: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
  2: { name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' },
};

export type TypeInfo = { name: string; url: string };
