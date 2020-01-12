import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICountry } from './country';
import { CountryService } from './country.service';

@Component({
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  pageTitle = 'Country Detail';
  errorMessage = '';
  country: ICountry | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private countryService: CountryService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('name');
    console.log('this.route.snapshot.paramMap : ', this.route.snapshot.paramMap);
    console.log('param : ', param);
    if (param) {
      this.getCountry(param);
    }
  }

  getCountry(name: string) {
    this.countryService.getCountry(name).subscribe({
      next: country => this.country = country,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/countries']);
  }
}
