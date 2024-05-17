// feedback-data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {

  private subject = new Subject<any>();

  sendClickEvent(data:any):void {
    this.subject.next(data);
  }

  getClickEvent(): Subject<any> {
    return this.subject;
  }
  
  selectedVisitorName: string | undefined;
  selectedclientName:string | undefined;
  // submittedBy:string | undefined;
  overallRating: number = 0;
  visitComment: string = '';
  demoFeedback: Array<{ demo_name: string, demo_rating: number, question_feedback?: Array<{ question: string, question_rating: number }>,demo_url:string }> = [];
  


  constructor(private http: HttpClient) {}

  // setSubmittedBy(submittedBy:string):void{
  //   this.submittedBy=submittedBy;
  //   console.log("this is from service name="+this.submittedBy);
  // }
  setSelectedVisitor(visitorName: string): void {
    this.selectedVisitorName = visitorName;
    console.log("this is from service name="+this.selectedVisitorName);
  } 
  setClientName(clientName: string): void {
    this.selectedclientName = clientName;
    console.log("this is from service name="+this.selectedclientName);
  } 

  setOverallRating(rating: number): void {
    this.overallRating = rating;
    console.log("this is from service over all rating is from fiveth component"+this.overallRating)
  }

  setVisitComment(comment: string): void {
    this.visitComment = comment;
    console.log("this is from service comment "+this.visitComment);
  }

  addDemoFeedback(demoData: {
    demo_name: string,
    demo_rating: number,
    question_feedback?: Array<{ question: string, question_rating: number }>,
    demo_url: string // Include demo_url parameter
  }): void {
    this.demoFeedback.push(demoData);
    
    // Print all demo ratings to the console
    console.log("Demo Ratings:");
    for (const feedback of this.demoFeedback) {
      console.log("this is from service"+`Demo Name: ${feedback.demo_name}, Rating: ${feedback.demo_rating}`);
    }
  }
  getSelectedVisitorName(): string {
    return this.selectedVisitorName ||' ';
  }

  getOverallRating(): number {
    return this.overallRating;
  }

  getVisitComment(): string {
    return this.visitComment;
  }
  getclientName(): string {
    return this.selectedclientName || '';
  }
  
  getDemoFeedback(): Array<{
    demo_name: string;
    demo_rating: number;
    question_feedback?: Array<{ question: string; question_rating: number }>;
    demo_url:string;
  }> {
    return this.demoFeedback;
  }
  

  private selectedFeedbackSource = new BehaviorSubject<any>(null);
  selectedFeedback$ = this.selectedFeedbackSource.asObservable();

  private filteredDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  filteredData$: Observable<any[]> = this.filteredDataSubject.asObservable();
  

  setSelectedFeedback(feedback: any): void {
    this.selectedFeedbackSource.next(feedback);
  }
  setFilteredData(data: any[]): void {
    this.filteredDataSubject.next(data);
    
  }

  getFilteredData(): Observable<any> {
    //console.log("filtered Visit in service file=",this.filteredData$);
    return this.filteredData$;
  }

   //store feedback data from second page 
   storeFeedback(feedbackData: any): Observable<any> {
    console.log("in service stored "+feedbackData);
    const url = 'http://localhost:5000/api/feedback/createFeedback';
    return this.http.post<any>(url, feedbackData);
  }

}
