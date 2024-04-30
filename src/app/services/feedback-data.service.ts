// feedback-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
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

}
