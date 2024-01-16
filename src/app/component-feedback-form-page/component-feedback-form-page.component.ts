import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackDataService } from '../services/feedback-data.service';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-component-feedback-form-page',
  templateUrl: './component-feedback-form-page.component.html',
  styleUrls: ['./component-feedback-form-page.component.css']
})
export class ComponentFeedbackFormPageComponent implements OnInit, OnDestroy {

  selectedFeedback: any;
  private subscription!: Subscription;
  
  overallRating: number = 0; // Initialize as needed
  visitComment: string = ''; // Initialize as needed
  demoFeedback: Array<{ demo_name: string, demo_rating: number, question_feedback?: Array<{ question: string, question_rating: number }> }> = [];

  constructor(
    private feedbackDataService: FeedbackDataService,
    private http: HttpClient  // Inject the HttpClient module
  ) {}

  stars = Array.from({ length: 5 }, (_, index) => index + 1);

  resetForm(): void {
    this.overallRating = 0;
    this.visitComment = '';
    this.demoFeedback = []; // Reset demo feedback array
    // Add any other properties you want to reset
  }

  ngOnInit(): void {
    this.subscription = this.feedbackDataService.selectedFeedback$.subscribe(feedback => {
      this.selectedFeedback = feedback;
      // Clear the form when a new feedback is selected
      this.resetForm();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setOverallRating(rating: number): void {
    this.overallRating = rating;
  }

  setDemoRating(demoIndex: number, demoName: string, rating: number): void {
    this.demoFeedback[demoIndex] = { demo_name: demoName, demo_rating: rating, question_feedback: [] };
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
  
  async handleSubmit(): Promise<void> {
    try {
      const feedbackData = {
        visit_date: this.selectedFeedback?.visit_date,
        client_name: this.selectedFeedback?.client_name,
        overall_rating: this.overallRating,
        demo_feedback: this.demoFeedback,
        visit_comment: this.visitComment,
      };
  
      const response = await fetch('https://feedback-app-v1-0.onrender.com/api/feedback/createFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });
  
      const responseData: any = await response.json();
      alert("Thank you for your lovely Feedback");
      this.resetForm();
      this.sendEmail(feedbackData);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  }

  // Format date and time
  formatDateAndTime(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour clock format
      timeZone: 'Asia/Kolkata', // Set the time zone to IST
    };
  
    const formattedDate = new Date(inputDate).toLocaleString('en-US', options);
    return formattedDate;
  }
  
  
  

  
  async sendEmail(feedbackData: any): Promise<void> {
    // console.log("send mail function called.");
  
    // Change the format of the date
    const formattedDateTime = this.formatDateAndTime(feedbackData.visit_date);
  
    // Implement logic to send an email
    const emailData = {
      service_id: 'service_7q3tl9p',
      template_id: 'template_xe43dpq',
      user_id: 'CegoZl-kwZuIrb_43',
      template_params: {
        'visit_date': formattedDateTime,
        'client_name': feedbackData.client_name,
        'overall_rating': feedbackData.overall_rating.toString(), // Convert to string if needed
        'visit_comment': feedbackData.visit_comment,
        'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...', // Replace with your reCAPTCHA response
        'demo_feedback': feedbackData.demo_feedback
          
      },
    };
  
    // console.log("email data: ", emailData);
  
    try {
      const response = await this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailData).toPromise();
      // console.log('Response from email service:', response);
  
      // Handle successful email sending
      console.log('Your mail is sent!');
    } catch (error) {
      // Handle error in email sending
      console.log('Oops... ' + JSON.stringify(error));
    }
  }
  

}
