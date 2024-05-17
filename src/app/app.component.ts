// This component sets up a flipbook, handles audio, 
//and allows switching between images and videos. 
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
    this.audio_flip = new Audio('assets/audio/flip_book_page.mp3'); // Initialize flip sound audio
    // this.audio_flip.load();

    this.audio_close = new Audio('assets/audio/book-opening.mp3'); // Initialize book closing sound audio
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
    this.imageUrl = localStorage.getItem('imageData'); // Get image URL from local/static storage
    this.textContent = localStorage.getItem('textConte​nt'); // Get text content from local/static storage

   
  }

  // Utility function to format date as DD-MM-YYYY
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  // Get current date in DD-MM-YYYY format
  currentDate: string = this.formatDate(new Date().toISOString().split('T')[0]);
  
  fetchVisitData(clientName: string, visitDate: string): void {
    fetch('http://localhost:5000/api/visit/visitList')
      .then(response => response.json())
      .then(data => {

        console.log("fetched data through api  in App.ts=",data);

        const filteredVisitByDate = data.filter((item: { visit_date: string; }) => this.formatDate(item.visit_date) === this.currentDate);
        const filteredData = filteredVisitByDate.find((item: { client_name: string; }) => item.client_name === clientName);
        console.log("filtered data in App.ts=",filteredData);
        this.feedbackDataService.setFilteredData(filteredData);
        
      })
      .catch(error => {
        console.error('Error Fetching Data:', error);
      });
  }

  private setupFlipbook(): void {
    if (this.flipbookEL) {
      ($(this.flipbookEL) as any).turn({
        autoCenter: true,
        when: {
          turning: (event: any, page: number, view: any) => {
            if (page >= 3 && page <= 12) {
              this.playAudio_flip(); // Play flip sound when turning pages 3 to 12 
              //the sound of turning the pages, inside the book
            }
            if (page == 1 || page == 2 || page == 13 || page == 14) {
              this.playAudio_close(); // Play book closing sound on pages 1, 2, 13, and 14
              //sound of opening and closing the book allocated to the pages from the begining and the end of the book
            }
          }
        }
      });

      window.addEventListener('resize', () => {
        ($(this.flipbookEL) as any).turn('size', this.flipbookEL.clientWidth, this.flipbookEL.clientHeight);
      });
    }
  }

  
  
  
  //end of that

  selectedFile: File | null = null; // Initialize a selected file variable
  imageUrl: string | null = null; // Initialize a URL for the selected image
  textContent: string | null = null; // Initialize text content variable

  // Function for storing in LocalStorage on the Angular side
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0]; // Get the selected file from the input event
    if (this.selectedFile) {
      if (this.selectedFile.type.startsWith('image/')) {
        // It's an image, you can display or process the image here.
        // this.selectedFile is of type File.
        const reader = new FileReader(); // Create a FileReader to read the image
        reader.onload = (e) => {
          this.imageUrl = e.target?.result as string; // Get the image URL
          localStorage.setItem('imageData', this.imageUrl); // Store the image data in local storage
        };
        reader.readAsDataURL(this.selectedFile); // Read the selected image as data URL
      } else if (this.selectedFile.type.startsWith('text')) {
        // It's a text file, you can read the content here.
        const reader = new FileReader(); // Create a FileReader to read the text file
        reader.onload = (e) => {
          this.textContent = e.target?.result as string; // Get the text content
          console.log(this.textContent); // Log the text content to the console
          localStorage.setItem('textContent', this.textContent); // Store the text content in local storage
        };
        reader.readAsText(this.selectedFile); // Read the selected text file as text
      }
    }
  }

 
}