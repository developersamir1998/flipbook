import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedbackDataService } from '../services/feedback-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-component-page-last',
  templateUrl: './component-page-last.component.html',
  styleUrls: ['./component-page-last.component.css']
})
export class ComponentPageLastComponent implements OnInit, OnDestroy {

  recievedClientName: string = '';
  selectedVisitorName: string = '';
  private intervalId: any;
  private subscription: Subscription | undefined;

  constructor(private feedbackdataservice: FeedbackDataService) {}

  ngOnInit(): void {
    // Call function to get current date in desired format
    this.subscription = this.feedbackdataservice.getFilteredData().subscribe(data => {
      console.log("getFilteredData() method called=", data);

      if (data) {
        // Assuming client_name is a property in the data
        this.recievedClientName = data.client_name.toUpperCase();
      } else {
        // Handle the case where filtered data is empty or undefined
        this.recievedClientName = "Loading Client Details..";
      }
    });

    // Set up interval to call getSelectedVisitorName every 5 seconds
    this.intervalId = setInterval(() => {
      const visitorName = this.feedbackdataservice.getSelectedVisitorName();
      console.log("recieved selected visitor name on last page=",visitorName);
      if (visitorName) {
        this.selectedVisitorName = visitorName;
        this.selectedVisitorName = this.selectedVisitorName.toUpperCase();
        
      }
    }, 500);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    // Unsubscribe from the observable to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
