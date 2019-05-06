import { Comment } from './comment.model'

export class Review  {
 "review_id" : number;
 "reviewer_avatar" : string;
 "review_title": string;
 "format" :string;
 "reviewed_date" : string;
 "rating" : number;
 "upvotes_count" : number;
 "downvotes_count" : number;
 "marked_as_helpful" : number;
 "comments_list" ?: Comment[];
 "isHelpfulClicked" ?: boolean;
 "isUpvoteClicked" ?: boolean;
 "isDownvoteClicked" ?: boolean;
}