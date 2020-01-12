import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './country-list.component';
import { CountryDetailComponent } from './country-detail.component';
import { ProductDetailGuard } from './country-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'countries', component: ProductListComponent },
      {
        path: 'countries/:name',
        canActivate: [ProductDetailGuard],
        component: CountryDetailComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    CountryDetailComponent
  ]
})
export class CountryModule { }
