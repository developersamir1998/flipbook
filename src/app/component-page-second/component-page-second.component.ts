import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { FeedbackDataService } from '../services/feedback-data.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-component-page-second',
  templateUrl: './component-page-second.component.html',
  styleUrls: ['./component-page-second.component.css']
})
export class ComponentPageSecondComponent implements OnInit,OnDestroy {
   // @ViewChild('feedbackForm') feedbackForm!: NgForm;


  selectedFeedback: any;
  private subscription!: Subscription;
  
  overallRating: number = 0; // Initialize as needed
  visitComment: string = ''; // Initialize as needed
  demoFeedback: Array<{ demo_name: string, demo_rating: number,demo_url:string, question_feedback?: Array<{ question: string, question_rating: number }> }> = [];
  //  demoDescription: string='';
  constructor(
    private feedbackDataService: FeedbackDataService,
    private http: HttpClient  // Inject the HttpClient module
  ) {

    this.feedbackDataService.getClickEvent().subscribe(() => {
     // this.demoFeedback=[];
      this.resetForm();
    });
  }

  stars = Array.from({ length: 5 }, (_, index) => index + 1);

  resetForm(): void {
    this.overallRating = 0;
    this.visitComment = '';
    this.demoFeedback = []; // Reset demo feedback array
    // Add any other properties you want to reset
    //this.feedbackForm.resetForm();
  }

  ngOnInit(): void {
    this.feedbackDataService.getFilteredData().subscribe(feedback => {
      this.selectedFeedback = feedback;
      console.log("getfilteredData() method called in second page=",feedback);
       
      // Clear the form when a new feedback is selected
      this.resetForm();
    });
  }

  // submitForm(): void {
  //   // Implement your form submission logic here
  //   // For example:
  //   this.handleSubmit(); // Call your handleSubmit method or any other logic you need
  // }

  ngOnDestroy(): void {
    //this.resetForm();
   // this.someFunction();
      
    this.subscription.unsubscribe();
  }

  // setOverallRating(rating: number): void {
  //   this.overallRating = rating;
  // }

  // setDemoRating(rating: number, demoIndex: number): void {
  //   const demoName = this.selectedFeedback?.demo_details[demoIndex]?.demo_name;
  //   this.demoFeedback[demoIndex] = { demo_name: demoName, demo_rating: rating, question_feedback: [] };
  // }
  setDemoRating(rating: number, demoIndex: number): void {
    const demoName = this.selectedFeedback?.demo_details[demoIndex]?.demo_name;
    const demoDescription= this.selectedFeedback?.demo_details[demoIndex]?.demo_description;
   console.log("in second page demo description"+demoDescription)
   // const demoUrl = this.selectedFeedback?.demo_details[demoIndex]?.demo_url;
   // this.demoFeedback[demoIndex] = { demo_name: demoName, demo_rating: rating, question_feedback: [] };
    const demoUrl="coming soon !!! ";
    const updatedDemoFeedback = { demo_name: demoName, demo_rating: rating,demo_url: demoUrl, question_feedback: [] };
    
    // Update demo feedback at specified index
    this.demoFeedback[demoIndex] = updatedDemoFeedback;

    // Add the updated demo feedback to the service
    this.feedbackDataService.addDemoFeedback(updatedDemoFeedback);
    
    
    // Calculate overall rating based on demo ratings
    let totalRating = 0;
    let numDemos = 0;
  
    this.demoFeedback.forEach((demo) => {
      if (demo.demo_rating) {
        totalRating += demo.demo_rating;
        numDemos++;
      }
    });
  
    // Update overallRating as the average of demo ratings
    if (numDemos > 0) {
      this.overallRating = totalRating / numDemos;
      // this.feedbackDataService.setOverallRating(this.overallRating);
      
    } else {
      this.overallRating = 0; // Reset if no demos are rated
    }
  }
  

  setQuestionRating(demoIndex: number, questionIndex: number, questionText: string, rating: number): void {
    if (!this.demoFeedback[demoIndex]?.question_feedback) {
      this.demoFeedback[demoIndex].question_feedback = [] as any[];
    }
    const questionFeedback = this.demoFeedback[demoIndex]?.question_feedback?.[questionIndex];
    if (questionFeedback) {
      questionFeedback.question_rating = rating;
    } else {
      this.demoFeedback[demoIndex]?.question_feedback?.push({ question: questionText, question_rating: rating });
    }
  }

  // Inside your ComponentFeedbackFormPageComponent class
  getQuestionRating(demoIndex: number, questionIndex: number): number {
    const demo = this.demoFeedback[demoIndex];
    if (demo && demo.question_feedback) {
      const questionFeedback = demo.question_feedback[questionIndex];
      return questionFeedback ? questionFeedback.question_rating : 0;
    }
    return 0;
  }
  
  // async handleSubmit(): Promise<void> {
  //   try {
  //     const feedbackData = {
  //       visit_date: this.selectedFeedback?.visit_date,
  //       client_name: this.selectedFeedback?.client_name,
  //       overall_rating: this.overallRating,
  //       demo_feedback: this.demoFeedback,
  //       visit_comment: this.visitComment,
  //     };
  
  //     const response = await fetch('https://feedback-app-v1-0.onrender.com/api/feedback/createFeedback', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(feedbackData)
  //     });
  
  //     const responseData: any = await response.json();
  //     alert("Thank you for your lovely Feedback");
  //     this.resetForm();
  //    // this.sendEmail(feedbackData);
  //   } catch (error) {
  //     console.error('Error saving feedback:', error);
  //   }
  // }
     
  // submitFeedbackForm(): void {
  //   console.log("entering the storefeedback:")
  //   // Build feedback data based on current state
  //   const feedbackData = {
  //     visit_date: this.selectedFeedback?.visit_date,
  //     client_name: this.selectedFeedback?.client_name,
  //     overall_rating: this.overallRating,
  //     demo_feedback: this.demoFeedback,
  //     visit_comment: "good",
  //   };

  //   // Call your feedback service to store the data
  //   this.feedbackDataService.storeFeedback(feedbackData).subscribe(
  //     response => {
  //       console.log('Feedback stored successfully:', response);
  //     },
  //     error => {
  //       console.error('Error storing feedback:', error);
  //     }
  //   );
    
  // }
  // autoSubmitForm(): void{
  //   if(this.allDemosRated()){
  //     this.submitFeedbackForm();
  //   }
  // }
  
  allDemosRated(): boolean {
    // Check if all demo ratings are provided
    return this.demoFeedback.every(demo => demo?.demo_rating !== undefined);
  }
    
  }
     

