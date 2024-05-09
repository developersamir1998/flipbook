import { Component, OnInit } from '@angular/core';
import { FeedbackDataService } from '../services/feedback-data.service';

@Component({
  selector: 'app-component-page-five',
  templateUrl: './component-page-five.component.html',
  styleUrls: ['./component-page-five.component.css']
})
export class ComponentPageFiveComponent implements OnInit {

  selectedFeedback: any;
  overallRating: number = 0;
  comment: string = '';


  constructor(private feedbackDataService: FeedbackDataService) { }

  ngOnInit(): void {
    this.feedbackDataService.getFilteredData().subscribe(feedback => {
      this.selectedFeedback = feedback;
      console.log("getfilteredData() method called in second page=",feedback);

      // Clear the form when a new feedback is selected
      //this.resetForm();
    });
  }

  setOverallRating(rating: number): void {
    this.overallRating = rating;
    this.feedbackDataService.setOverallRating(this.overallRating);
  }

 // Handle input event for the textarea to update the comment
 handleCommentInput(event: Event): void {
  // Safely access the target value using type assertion
  const target = event.target as HTMLTextAreaElement;
  this.comment = target.value;
  this.feedbackDataService.setVisitComment(this.comment);
}

submitFeedbackForm(): void {
  console.log("entering the storefeedback:")
  // Build feedback data based on current state
  const feedbackData = {
    visit_date: this.selectedFeedback?.visit_date,
    client_name: this.feedbackDataService.getSelectedVisitorName(),
    overall_rating: this.feedbackDataService.getOverallRating(),
    demo_feedback: this.feedbackDataService.getDemoFeedback(),
    visit_comment: this.feedbackDataService.getVisitComment()
  };

  // Call your feedback service to store the data
  this.feedbackDataService.storeFeedback(feedbackData).subscribe(
    response => {
      console.log('Feedback stored successfully:', response);
    },
    error => {
      console.error('Error storing feedback:', error);
    }
  );
  
}
feedbacksubmit(){
  this.submitFeedbackForm();
} 
}
