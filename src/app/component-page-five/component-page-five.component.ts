import { Component, OnInit } from '@angular/core';
import { FeedbackDataService } from '../services/feedback-data.service';
import * as $ from 'jquery'; // Import the jQuery library
//libraries for turning the page effect
import 'src/assets/turn.js'; // Import a custom JavaScript library (turn.js)
import 'src/assets/turn.min.js'; // Import a minified version of the custom JavaScript library
import 'turn.js'; // Import another JavaScript library (turn.js)

@Component({
  selector: 'app-component-page-five',
  templateUrl: './component-page-five.component.html',
  styleUrls: ['./component-page-five.component.css']
})
export class ComponentPageFiveComponent implements OnInit {

  feedbackSubmitted: boolean = false;

  selectedFeedback: any;
  overallRating: number = 0;
  comment: string = '';
  visitorDetails: any[] = [];


  constructor(private feedbackDataService: FeedbackDataService, ) { }

  ngOnInit(): void {
    this.feedbackDataService.getFilteredData().subscribe(feedback => {
      this.selectedFeedback = feedback;
      console.log("getfilteredData() method called in second page=",feedback);
      this.visitorDetails=feedback.visitors_details;
      console.log("from five vistor data :" +this.visitorDetails[0].visitor_name+this.visitorDetails[0].visitor_designation)
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

// 
submitFeedbackForm(): void {
  console.log("entering the storefeedback:")
  const feedbackData = {
    visit_date: this.selectedFeedback?.visit_date,
    client_name: this.feedbackDataService.getclientName(),
    overall_rating: this.feedbackDataService.getOverallRating(),
    demo_feedback: this.feedbackDataService.getDemoFeedback().map((demo: any) => ({
      demo_name: demo.demo_name,
      demo_rating: demo.demo_rating,
      demoUrl: demo.demo_url, // Ensure that demoUrl is correctly populated
      question_feedback: demo.question_feedback,
     
    })),
    visit_comment: this.feedbackDataService.getVisitComment(),
    visitors_details:this.visitorDetails.map((data: any) => (
      {
        
        visitor_name: data.visitor_name,
	      visitor_designation: data.visitor_designation,
        
      })),
    submittedBy: this.feedbackDataService.getSelectedVisitorName()
  };

  console.log("Feedback Data:", feedbackData); // Log feedback data to verify demoUrl field

  this.feedbackDataService.storeFeedback(feedbackData).subscribe(
    response => {
      console.log('Feedback stored successfully:', response);
      this.feedbackSubmitted = true;  
      this.openLastPage(); // Call function to open the last page
    },
    error => {
      console.error('Error storing feedback:', error);
    }
  );
}

openLastPage(): void {
  // Assuming you have a function to navigate to the last page in your flipbook library
  // Replace this with the appropriate function call from your flipbook library
  ($("#flipbook") as any).turn("page", 6);
  setTimeout(() => {
    console.log("After 5 second page 1 will me open.");
    ($("#flipbook") as any).turn("page", 1);
  }, 5000);

  
  
}

onPopuphomeClicked(): void {
  // Redirect to YouTube or any other logic you want to perform after the user clicks "OK"
  window.location.href = 'https://homepageslidder.onrender.com/';
}
onPopupfirstClicked():void{
  var urlParams = new URLSearchParams(window.location.search);
    var clientName = urlParams.get('clientName') ?? '';
    var visitDate = urlParams.get('visitDate') ?? '';
  var redirectURL = "https://developersamir1998.github.io/flipbook?clientName=" + encodeURIComponent(clientName) + "&visitDate=" + encodeURIComponent(visitDate);
  window.location.href = redirectURL;
}



feedbacksubmit(){
  this.submitFeedbackForm();
} 
}
