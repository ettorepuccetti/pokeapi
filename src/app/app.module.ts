import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { SearchComponent } from './search/search.component';
import { TypeFilterComponent } from './type-filter/type-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonCardComponent,
    GridComponent,
    PaginationComponent,
    SearchComponent,
    TypeFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
