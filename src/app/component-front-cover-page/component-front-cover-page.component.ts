// component-front-cover-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackDataService } from '../services/feedback-data.service';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-component-front-cover-page',
  templateUrl: './component-front-cover-page.component.html',
  styleUrls: ['./component-front-cover-page.component.css'],
  
})
export class ComponentFrontCoverPageComponent implements OnInit {
  
  recievedClientName!: string | null | '';
  
  visitorDetails: any[] = [];

  constructor(
    private router: Router, 
    private feedbackDataService: FeedbackDataService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
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
