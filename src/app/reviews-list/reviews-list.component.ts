import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/review.model';
import { Comment } from '../shared/comment.model';
import { ReviewsService } from '../services/reviews.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
  providers:[PubNubAngular]
})
export class ReviewsListComponent implements OnInit {

  // variable initializations
  reviewsList: Review[] = [];
  commentsList: Comment[] = [];
  isDataLoaded: boolean;
  isCommentSectionLoaded: boolean = false;
  isCommentPosted: boolean = false;
  commentForm: FormGroup;
  name: FormControl;
  email: FormControl;
  comment: FormControl
  matcher : ErrorStateMatcher
  constructor(
    private pubNubService:PubNubAngular,
    private _reviewsService: ReviewsService,
    private _commentFormBuilder: FormBuilder
  ) { 
    
    

  }

  ngOnInit() {
    this.matcher = new ErrorStateMatcher();
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.comment = new FormControl('', [Validators.required, Validators.maxLength(160)])
    this.commentForm = this._commentFormBuilder.group({
      name: this.name,
      email: this.email,
      comment: this.comment
    })
    this.getReviewsList();
  }
  // get the reviews list
  getReviewsList() {
    this.isDataLoaded = false
    this._reviewsService.getReviewsList().subscribe((res) => {
      setTimeout(() => {
        this.reviewsList = res;
        this.isDataLoaded = true;
      }, 2000)
    }, (err) => {
      console.log(err);
    })
  }

  // get the comments related to the review
  getReviewComments(reviewId, i) {
    this.isCommentSectionLoaded = false;
    this.reviewsList[i].comments_list = [];
    this._reviewsService.getReviewComments(reviewId).subscribe(
      (res) => {
        setTimeout(() => {
          this.reviewsList[i].comments_list = res;
          this.isCommentSectionLoaded = true;
        }, 2000)
      }, (err) => {
        console.log(err);
      }
    )
  }

  // get the comments related to the review
  postComment(i) {
    this.isCommentSectionLoaded = false;
    setTimeout(() => {
      let commentObject: Comment = {
        created_by: this.commentForm.value['name'],
        created_at: '21-Dec-2018 11:56PM',
        comment: this.commentForm.value['comment']
      }
      this.reviewsList[i].comments_list.unshift(commentObject);
      this.commentForm.markAsPristine();
      this.commentForm.markAsUntouched();
      this.commentForm.reset();
      this.pubNubService.publish( {
                    message: {
                        such: 'Hello!'
                    },
                    channel: 'my_channel'
                },(status,res)=>{
                  console.log(status);
                  console.log(res);
                })
      this.isCommentSectionLoaded = true;
    }, 2000)
  }

  // marked as helpful
  markAsHelpful(review, i) {
    if (review.isHelpfulClicked) {
      this.reviewsList[i].isHelpfulClicked = false;
      this.reviewsList[i].marked_as_helpful -= 1;
    } else {
      this.reviewsList[i].isHelpfulClicked = true;
      this.reviewsList[i].marked_as_helpful += 1;
    }
  }

  //upvote clicked
  upvoteClick(review, i) {
    if (review.isUpvoteClicked) {
      this.reviewsList[i].isUpvoteClicked = false;
      this.reviewsList[i].upvotes_count -= 1;
    } else {
      if (review.isDownvoteClicked) {
        this.reviewsList[i].isDownvoteClicked = false;
        this.reviewsList[i].downvotes_count -= 1;
      }
      this.reviewsList[i].isUpvoteClicked = true;
      this.reviewsList[i].upvotes_count += 1;
    }
  }

  //downvote clicked
  downvoteClick(review, i) {
    if (review.isDownvoteClicked) {
      this.reviewsList[i].isDownvoteClicked = false;
      this.reviewsList[i].downvotes_count -= 1;
    } else {
      if (review.isUpvoteClicked) {
        this.reviewsList[i].isUpvoteClicked = false;
        this.reviewsList[i].upvotes_count -= 1;
      }
      this.reviewsList[i].isDownvoteClicked = true;
      this.reviewsList[i].downvotes_count += 1;
    }
  }

}
