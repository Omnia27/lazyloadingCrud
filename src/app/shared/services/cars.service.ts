import { map } from 'rxjs/operators';
import { carDto } from './../models/car.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { 

  }
  list():Observable<carDto[]>{
   return this.http.get<carDto[]>("https://5f98448742706e001695832a.mockapi.io/api/assignment/cars")
  }
  
  add(newcar:carDto){
    return this.http.post("https://5f98448742706e001695832a.mockapi.io/api/assignment/cars",newcar);
  }
  edit(id:number,obj:carDto){
    return this.http.put("https://5f98448742706e001695832a.mockapi.io/api/assignment/cars/"+id,obj);
  }
  
  delete(id:number){
    return this.http.delete("https://5f98448742706e001695832a.mockapi.io/api/assignment/cars/"+id);
  }
  getById(id:number){
    return this.http.get<carDto>("https://5f98448742706e001695832a.mockapi.io/api/assignment/cars/"+id)
  }
 
}
