// component-front-cover-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackDataService } from '../services/feedback-data.service';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import * as $ from 'jquery'; // Import the jQuery library
//libraries for turning the page effect
import 'src/assets/turn.js'; // Import a custom JavaScript library (turn.js)
import 'src/assets/turn.min.js'; // Import a minified version of the custom JavaScript library
import 'turn.js'; // Import another JavaScript library (turn.js)


@Component({
  selector: 'app-component-front-cover-page',
  templateUrl: './component-front-cover-page.component.html',
  styleUrls: ['./component-front-cover-page.component.css'],
  
})
export class ComponentFrontCoverPageComponent implements OnInit {
  
  recievedClient!: string | null | '';
  recievedClientName!: string | null | '';
  visitorDetails: any[] = [];

  currentDate: string | undefined;

  selectedVisitor: string = ''; // To store the selected visitor name

  constructor(
    private feedbackdataservice:FeedbackDataService,
    private router: Router, 
    private feedbackDataService: FeedbackDataService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Call function to get current date in desired format
    this.currentDate = this.getCurrentDate();

    this.feedbackDataService.getFilteredData().subscribe(data => {
      if (data) {
        // Assuming client_name is a property in the data
        this.recievedClientName = data.client_name.toUpperCase();
        this.visitorDetails=data.visitors_details;
        this.feedbackDataService.setClientName(data.client_name);
      } else {
        // Handle the case where filtered data is empty or undefined
        this.recievedClientName = "Loading Client Details..";
        console.error('Data recieved from service file is empty');
      }
      
    });

  }

 
  getCurrentDate(): string {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  handleVisitorSelection(visitorName: string): void {
    if (this.selectedVisitor === visitorName) {
      // Deselect visitor if already selected
      this.selectedVisitor = '';
    } else {
      // Select visitor
      this.selectedVisitor = visitorName;
      this.openSecondPage(); // Call function to open the second page
    }
    // Pass the selected visitor name to the service
    this.feedbackDataService.setSelectedVisitor(this.selectedVisitor);
  }

  openSecondPage(): void {
    // Assuming you have a function to navigate to the last page in your flipbook library
    // Replace this with the appropriate function call from your flipbook library
    ($("#flipbook") as any).turn("page", 2);
  }

  isVisitorSelected(visitorName: string): boolean {
    // Check if the visitor is currently selected
    return this.selectedVisitor === visitorName;
  }

  
  
  
}
