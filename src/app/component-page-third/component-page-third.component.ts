import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackDataService } from '../services/feedback-data.service';

@Component({
  selector: 'app-component-page-third',
  templateUrl: './component-page-third.component.html',
  styleUrls: ['./component-page-third.component.css']
})
export class ComponentPageThirdComponent implements OnInit,OnDestroy{

  selectedFeedback:any;
  private subscription!: Subscription;
  constructor(
    private feedbackDataService: FeedbackDataService
  ){}
  ngOnDestroy(): void {

   this.subscription.unsubscribe();
    //throw new Error('Method not implemented.');
  };
  ngOnInit(): void {

    this.feedbackDataService.getFilteredData().subscribe(feedback => {
      this.selectedFeedback=feedback;
      console.log("getfilteredData() method called in third page=",feedback);
     // this.resetForm;
    }); 
   // throw new Error('Method not implemented.');
  };


}
