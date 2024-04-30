// feedback-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  private selectedFeedbackSource = new BehaviorSubject<any>(null);
  selectedFeedback$ = this.selectedFeedbackSource.asObservable();
  filteredData: any[] = [];

  setSelectedFeedback(feedback: any): void {
    this.selectedFeedbackSource.next(feedback);
  }
  setFilteredData(data: any[]): void {
    this.filteredData = data;
    console.log("filtered Visit in service file=",this.filteredData);
  }

  getFilteredData(): any[] {
    return this.filteredData;
  }
}
