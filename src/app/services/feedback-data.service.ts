// feedback-data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  
  constructor(private http: HttpClient) {}

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
    const url = 'https://feedback-app-v1-0.onrender.com/api/feedback/createFeedback';
    return this.http.post<any>(url, feedbackData);
  }

}
