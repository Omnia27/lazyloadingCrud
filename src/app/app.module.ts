import { ConfigInterceptorService } from './shared/services/interceptor/config-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule, DatePipe } from "@angular/common";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS

} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }), // ToastrModule added
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConfigInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
