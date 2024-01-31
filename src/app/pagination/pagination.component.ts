import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITEM_PER_PAGE } from '../../constants';
import { PokemonsListPage } from '../data/datamodel';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() pokemonsListPage: Omit<PokemonsListPage, 'results'> | null = null;

  @Output() onPrevClick: EventEmitter<string> = new EventEmitter();
  @Output() onNextClick: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onPrev() {
    if (!this.pokemonsListPage?.prevUrl) {
      throw new Error('Button should be disabled');
    }
    this.onPrevClick.emit(this.pokemonsListPage.prevUrl);
  }

  onNext() {
    if (!this.pokemonsListPage?.nextUrl) {
      throw new Error('Button should be disabled');
    }
    this.onNextClick.emit(this.pokemonsListPage.nextUrl);
  }

  isPrevDisabled(): boolean {
    return !this.pokemonsListPage?.prevUrl;
  }

  isNextDisabled(): boolean {
    return !this.pokemonsListPage?.nextUrl;
  }

  getCounter(): number {
    return this.pokemonsListPage?.indexCounter ?? 1;
  }

  getMaxCounter(): number {
    const count: number = this.pokemonsListPage?.count ?? ITEM_PER_PAGE;
    return Math.ceil(count / ITEM_PER_PAGE);
  }
}
