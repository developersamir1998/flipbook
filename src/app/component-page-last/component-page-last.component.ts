import { Component, OnInit } from '@angular/core';
import { FeedbackDataService } from '../services/feedback-data.service';

@Component({
  selector: 'app-component-page-last',
  templateUrl: './component-page-last.component.html',
  styleUrls: ['./component-page-last.component.css']
})
export class ComponentPageLastComponent implements OnInit {

  recievedClientName!: string | null | '';

  constructor( private feedbackdataservice: FeedbackDataService){}
  ngOnInit(): void {
    // Call function to get current date in desired format

    this.feedbackdataservice.getFilteredData().subscribe(data => {
      console.log("getfilteredData() method called=",data);
      
      if (data ) {
        // Assuming client_name is a property in the data
        this.recievedClientName = data.client_name.toUpperCase();
       

      } else {
        // Handle the case where filtered data is empty or undefined
        this.recievedClientName = "Loading Client Details..";
       // console.error('Data recieved from service file is empty');
      }
      
    });

  }


}
