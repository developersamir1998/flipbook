// component-front-cover-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackDataService } from '../services/feedback-data.service';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-component-front-cover-page',
  templateUrl: './component-front-cover-page.component.html',
  styleUrls: ['./component-front-cover-page.component.css'],
  
})
export class ComponentFrontCoverPageComponent implements OnInit {
  
  recievedClientName!: string | null | '';
  
  visitorDetails: any[] = [];

  currentDate: string | undefined;

  constructor(
    private feedbackdataservice:FeedbackDataService,
    private router: Router, 
    private feedbackDataService: FeedbackDataService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Call function to get current date in desired format
    this.currentDate = this.getCurrentDate();

    this.feedbackDataService.getFilteredData().subscribe(data => {
      console.log("getfilteredData() method called=",data);
      
      if (data ) {
        // Assuming client_name is a property in the data
        this.recievedClientName = data.client_name;
        this.visitorDetails=data.visitors_details;

      } else {
        // Handle the case where filtered data is empty or undefined
        this.recievedClientName = "Loading Client Details..";
        console.error('Data recieved from service file is empty');
      }
      
    });

  }

  handleVisitorSelection(visitorName: string): void {
    this.feedbackdataservice.setSelectedVisitor(visitorName);
    console.log("going to service");
  }
  getCurrentDate(): string {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  

  
  
  // handleButtonClick(clientName: string): void {
  //   const selectedFeedback = this.filteredData.find(item => item.client_name === clientName);
  //   console.log("selected Feedback=",selectedFeedback);
  //   if (selectedFeedback) {
  //     this.selectedClientName = clientName;
  //     this.feedbackDataService.setSelectedFeedback(selectedFeedback);
  //   }
  // }

  // Check if a button is selected
  // isButtonSelected(clientName: string): boolean {
  //   return this.selectedClientName === clientName;
  // }

  
}
