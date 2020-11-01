import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr"
@Injectable({
  providedIn: 'root'
})
export class ConfigInterceptorService implements HttpInterceptor {

  constructor( private _toastr:ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let message: string;
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if(event instanceof HttpResponse && event.status===201){
            this._toastr.success(" Added Successfully");
          }
          if(event instanceof HttpResponse && request.method=='PUT'&&event.status===200){
            this._toastr.success(" Changed Successfully");
          }
          if(event instanceof HttpResponse && request.method=='DELETE'&&event.status===200){
            this._toastr.success(" Deleted Successfully");
          }
          message="success"
        },
         (error: HttpErrorResponse) => {
           if(error.status==404){
            this._toastr.error("Not found");
           }
           else{
            this._toastr.error(error.message);
           }
           message="falied"
         }
      ),
      //Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}" ${message} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
    
    // ...
  }
}
