import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

const routes: Routes = [
  { path:'', redirectTo:'list',pathMatch:'full' },
  { path:'list', component:ReviewsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
