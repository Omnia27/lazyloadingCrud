import { ToastrService } from 'ngx-toastr';
import { CarsService } from './../../../shared/services/cars.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { carDto } from 'src/app/shared/models/car.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  carform:FormGroup;
  carId:number;
  isSubmited:boolean
  isEdit:boolean=false;
  constructor(private _carservices:CarsService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _tostar:ToastrService
    ) { }

  ngOnInit(): void {
    this.carform= new FormGroup({
      name:new FormControl('',Validators.required),
      model:new FormControl('',Validators.required), 
       color:new FormControl('',Validators.required),
       imageUrl:new FormControl('',[Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    })
    this.carId = +this._route.snapshot.paramMap.get("id");
    console.log( this.carId)
    if(this.carId>0){
      this.isEdit=true;
      this._carservices.getById(this.carId).subscribe((e:carDto)=>{
        this.BindData(e)
      })
    }
  }
save(){
  this.isSubmited=true;
  if(this.carform.valid){
     this._carservices.add(this.carform.value).subscribe(e=>{
      this._router.navigate(['/cars/list']);
    });
  }
  else{
    this._tostar.error("Invaild Form");
  } 
}
update(){
 this.isSubmited=true;
  console.log(this.carform.valid)
  if(this.carform.valid){
  this._carservices.edit(this.carId,this.carform.value).subscribe(e=>{
    this._router.navigate(['/cars/list']);
  })}
  else{
    this._tostar.error("Invaild Form");
  } 
}

BindData(data:any){
  this.carform.patchValue({
    name:data.name,
    color:data.color,
    model:data.model,
    imageUrl:data.imageUrl
  })
}
resetform(){
  this.carform.reset();
}
get f() { return this.carform.controls; }
}
