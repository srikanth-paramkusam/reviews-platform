import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Review } from '../shared/review.model';
import { Comment } from '../shared/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private _http : HttpClient
  ) { }

  // To get the list of reviews
  getReviewsList(){
    return this._http.get<Review[]>(`${environment.apiBase}/list`);
  }

  // To get the list of reviews
  getReviewComments(reviewId){
    return this._http.get<Comment[]>(`${environment.apiBase}/comments/${reviewId}`);
  }
  
}
