// component-front-cover-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackDataService } from '../services/feedback-data.service';

@Component({
  selector: 'app-component-front-cover-page',
  templateUrl: './component-front-cover-page.component.html',
  styleUrls: ['./component-front-cover-page.component.css']
})
export class ComponentFrontCoverPageComponent implements OnInit {
  feedbackData: any[] = [];
  currentVisitStatus: string = 'We are checking today visits.';
  filteredData: any[] = [];
  selectedClientName: string | null = null;

  constructor(private router: Router, private feedbackDataService: FeedbackDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch data from the API
  fetchData(): void {
    fetch('https://feedback-app-v1-0.onrender.com/api/visit/visitList')
      .then(response => response.json())
      .then(data => {
        this.feedbackData = data;
        this.filterData();
      })
      .catch(error => {
        console.error('Error Fetching Data:', error);
      });
  }

  // Utility function to format date as DD-MM-YYYY
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  // Get current date in DD-MM-YYYY format
  currentDate: string = this.formatDate(new Date().toISOString().split('T')[0]);

  // Filter data based on the current date
  filterData(): void {
    this.filteredData = this.feedbackData.filter(item => this.formatDate(item.visit_date) === this.currentDate);
    
    if (this.filteredData.length === 0) {
      
      this.currentVisitStatus = 'No Visit Today.';
    }
  }

  handleButtonClick(clientName: string): void {
    const selectedFeedback = this.filteredData.find(item => item.client_name === clientName);
  
    if (selectedFeedback) {
      this.selectedClientName = clientName;
      this.feedbackDataService.setSelectedFeedback(selectedFeedback);
    }
  }

  // Check if a button is selected
  isButtonSelected(clientName: string): boolean {
    return this.selectedClientName === clientName;
  }

  // navigateToFeedbackDetails(clientName: string, visitDate: string): void {
  //   const selectedFeedback = this.filteredData.find(item => item.client_name === clientName && item.visit_date === visitDate);
    
  //   if (selectedFeedback) {
  //     this.router.navigate(['/feedback-details'], { state: { feedback: selectedFeedback } });
  //   }
  // }
}
