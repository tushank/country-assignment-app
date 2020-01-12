import { Component, OnInit } from '@angular/core';

import { ICountry } from './country';
import { CountryService } from './country.service';

@Component({
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Country List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.countries;
  }

  filteredProducts: ICountry[] = [];
  countries: ICountry[] = [];

  constructor(private countryService: CountryService) {

  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Country List: ' + message;
  }

  performFilter(filterBy: string): ICountry[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: ICountry) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: countries => {
        this.countries = countries;
        this.filteredProducts = this.countries;
      },
      error: err => this.errorMessage = err
    });
  }
}
