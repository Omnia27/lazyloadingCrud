import { Routes } from '@angular/router';
export const content:Routes=[
    {
        path:"cars",
        loadChildren:()=>import("../../components/cars/cars.module").then(m=>m.CarsModule)
            
        
    }
]