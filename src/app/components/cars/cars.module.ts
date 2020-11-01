import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { CarFormComponent } from './car-form/car-form.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [ListCarsComponent, CarFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarsRoutingModule,
    NgxDatatableModule

  ]
})
export class CarsModule { }
