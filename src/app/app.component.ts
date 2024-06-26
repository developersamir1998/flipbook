// This component sets up a flipbook, handles audio, 
//It also handles file input and stores data in local storage. 

import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'; // Import necessary Angular components and modules
import * as $ from 'jquery'; // Import the jQuery library
//libraries for turning the page effect
import 'src/assets/turn.js'; // Import a custom JavaScript library (turn.js)
import 'src/assets/turn.min.js'; // Import a minified version of the custom JavaScript library
import 'turn.js'; // Import another JavaScript library (turn.js)
import { Router } from '@angular/router';
import { FeedbackDataService } from './services/feedback-data.service';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Define the template for the component
  styleUrls: ['./app.component.css'] // Define the styles for the component
})

export class AppComponent implements OnInit {
  photos!: any[]; // Define an array to store photos
  private flipbookEL!: HTMLElement; // Define a private property to store the flipbook element
  private audio_flip: HTMLAudioElement; // Define an HTML audio element for flip sounds
  private audio_close: HTMLAudioElement; // Define an HTML audio element for book closing sounds
  isVideoOpen = false; // Initialize a flag for video open state

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private feedbackDataService: FeedbackDataService,
    private route: ActivatedRoute
  ) {
    // Constructor function to initialize the component
    this.audio_flip = new Audio('assets/audio/Pageturn.mp3'); // Initialize flip sound audio
    // this.audio_flip.load();

    this.audio_close = new Audio('assets/audio/Pageturn.mp3'); // Initialize book closing sound audio
    // this.audio_close.load();
  }

  playAudio_flip() {
    this.audio_flip.play(); // Function to play flip sound
  }

  playAudio_close() {
    this.audio_close.play(); // Function to play book closing sound
  }

  ngOnInit(): void {
    //accept params and fetched visit data
    this.route.queryParams.subscribe(params => {
      const clientName = params['clientName'];
      const visitDate = params['visitDate'];
      if (clientName && visitDate) {
        this.fetchVisitData(clientName, visitDate);
      }
    });

    this.flipbookEL = this.el.nativeElement.querySelector('#flipbook'); // Get the flipbook element
    this.setupFlipbook(); // Call a function to set up the flipbook
  }

  // Utility function to format date as DD-MM-YYYY
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  // Get current date in DD-MM-YYYY format
  currentDate: string = this.formatDate(new Date().toISOString().split('T')[0]);

  fetchVisitData(clientName: string, visitDate: string): void {
    fetch('https://backend-new-cshx.onrender.com/api/visit/visitList')
      .then(response => response.json())
      .then(data => {
        console.log("fetched data through api  in App.ts=", data);
        const filteredVisitByDate = data.filter((item: { visit_date: string; }) => (item.visit_date) == visitDate);
        const filteredData = filteredVisitByDate.find((item: { client_name: string; }) => item.client_name === clientName);
        console.log("filtered data in App.ts=", filteredData);
        this.feedbackDataService.setFilteredData(filteredData);
      })
      .catch(error => {
        console.error('Error Fetching Data:', error);
      });
  }

  private setupFlipbook(): void {
    if (this.flipbookEL) {
      ($(this.flipbookEL) as any).turn({
        width: 2200,
        autoCenter: true,
        acceleration: false, // Disable hardware acceleration for smoother transitions
        duration: 1500, // Set the duration of the page flip to 2000ms (2 seconds)
        when: {
          turning: (event: any, page: number, view: any) => {
            console.log("corner clicked!=", page);

            //display logo
            ($("#logo") as any).addClass("visibleLogo");

            // Text on sides
            if (page == 1) {
              //add text at page 1
              ($("#text-page1") as any).addClass("visibleTextPage1");
            }
            if (page > 1) {
              // remove text at page 1
              ($("#text-page1") as any).removeClass("visibleTextPage1");
            }
            if (page == 6) {
              //add text at page 6
              ($("#text-page6") as any).addClass("visibleTextPage6");
            }
            if (page < 6) {
              // remove text at page 6
              ($("#text-page6") as any).removeClass("visibleTextPage6");
            }

            // Shadows on page
            if (page > 1 && page < 6) {
              //add shadow
              ($(this.flipbookEL) as any).addClass("visible");
            }
            else {
              //remove shadow
              ($(this.flipbookEL) as any).removeClass("visible");
              //display logo
              //($("#logo") as any).removeClass("visibleLogo");
            }

            // Play page flip Audio
            if (page >= 3 && page <= 4) {
              this.playAudio_flip(); // Play flip sound when turning pages 3 to 4
            }
            if (page == 1 || page == 2 || page == 5 || page == 6) {
              this.playAudio_close(); // Play book closing sound on pages 1, 2, 13, and 14
              //sound of opening and closing the book allocated to the pages from the begining and the end of the book
            }
          },
        }
      });
    }
  }
}
