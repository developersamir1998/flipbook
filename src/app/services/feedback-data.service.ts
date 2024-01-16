// feedback-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {
  private selectedFeedbackSource = new BehaviorSubject<any>(null);
  selectedFeedback$ = this.selectedFeedbackSource.asObservable();

  setSelectedFeedback(feedback: any): void {
    this.selectedFeedbackSource.next(feedback);
  }
}
