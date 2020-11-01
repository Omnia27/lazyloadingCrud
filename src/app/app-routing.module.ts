import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  { 
    path: "",
      redirectTo: "/cars/list",
      pathMatch: "full"
  }
,
{
 path:"",
 children:content
 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
