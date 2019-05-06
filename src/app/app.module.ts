import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  MatFormFieldModule, 
  MatInputModule,
  MatExpansionModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewsService } from './services/reviews.service'
  import { PubNubAngular } from 'pubnub-angular2';
@NgModule({
  declarations: [
    AppComponent,
    ReviewsListComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    PubNubAngular,
    ReviewsService,
    {
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
