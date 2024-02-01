import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonsListPage } from '../data/datamodel';
import { DEFAULT_URL } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Output() onSearchClick: EventEmitter<PokemonsListPage> = new EventEmitter();
  @Output() onBackClick: EventEmitter<void> = new EventEmitter();
  searchValue: string = '';
  backButtonVisible: boolean = false;

  onSearch() {
    this.backButtonVisible = true;
    this.onSearchClick.emit({
      count: 1,
      nextUrl: null,
      prevUrl: null,
      indexCounter: 1,
      pokemons: [
        {
          name: this.searchValue,
          url: DEFAULT_URL + this.searchValue,
        },
      ],
    });
  }

  isSearchDisabled(): boolean {
    return !this.searchValue;
  }

  onBack() {
    this.searchValue = '';
    this.backButtonVisible = false;
    this.onBackClick.emit();
  }

  isBackButtonVisible(): boolean {
    return this.backButtonVisible;
  }
}
