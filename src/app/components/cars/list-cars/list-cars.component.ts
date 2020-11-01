import { carDto } from './../../../shared/models/car.model';
import { CarsService } from './../../../shared/services/cars.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  constructor(private carServices:CarsService, private _router:Router) { }
  listCars:carDto[]=[];
  temp :carDto[];
  deletecar$:Subscription
  ngOnInit(): void {
   this.carServices.list().subscribe((cars)=>{
     console.log("test",cars)
    this.listCars=cars;
    this.temp=cars;
   })
  }
  updateFilter(event):carDto[] {
    const val = event.target.value.toLowerCase();
    console.log(val)
    // filter our data
    const temp = this.temp.filter((d:carDto)=> {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val || 
      d.model.toLowerCase().indexOf(val)!== -1 || 
      d.color.toLowerCase().indexOf(val)!== -1  ;
    });

    // update the rows
    return this.listCars = temp;
  }
 onDelete(row){
  this.deletecar$= this.carServices.delete(row.id).subscribe((car:carDto)=>{
     this.listCars = this.listCars.filter(
    (item) => item.id !== car.id
  );
  console.log("delete",this.listCars)
  });
  }
onEdit(row){
  this._router.navigate(["/cars/edit/", row.id]   
  );
}
addNewCar(){
  this._router.navigate(['/cars/add']);
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.deletecar$?this.deletecar$.unsubscribe():null;
  
}
}
