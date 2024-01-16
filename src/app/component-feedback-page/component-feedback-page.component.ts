import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackDataService } from '../services/feedback-data.service';


@Component({
  selector: 'app-component-feedback-page',
  templateUrl: './component-feedback-page.component.html',
  styleUrls: ['./component-feedback-page.component.css']
})
export class ComponentFeedbackPageComponent implements OnInit, OnDestroy{
  selectedFeedback: any;
  private subscription!: Subscription;

  constructor(private feedbackDataService: FeedbackDataService) {}

  ngOnInit(): void {
    this.feedbackDataService.selectedFeedback$.subscribe(feedback => {
      
      this.selectedFeedback = feedback;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
