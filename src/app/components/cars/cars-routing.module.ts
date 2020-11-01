import { CarFormComponent } from './car-form/car-form.component';
import { ListCarsComponent } from './list-cars/list-cars.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from 'src/app/shared/routes/content-routes';

const routes: Routes = [
  {
    path:"",
    children:[
       {
         path:"list",
         component:ListCarsComponent
       },
       {
        path:"add",
        component:CarFormComponent
       },
       {
        path:"edit/:id",
        component:CarFormComponent
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
