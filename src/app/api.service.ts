// This code represents the api service for Gallery table/collection
// This code defines an ApiService in an Angular application. It is responsible for making HTTP requests 
// to interact with a server API. The service includes methods for fetching gallery data by ID 
// and for adding new gallery items along with image files. 
// It also has error handling logic and methods for setting and retrieving a shared ID. 
// Additionally, it uses Angular's HttpClient to make HTTP requests.


// Import necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Gallery } from './gallery';

// Define the API endpoint URL
const apiUrl = 'http://localhost:3000/gallery';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Define a private variable to store the shared ID
  private id: string = '';

  // Setter method for the shared ID
  setSharedId(id: string) {
    this.id = id;
  }

  // Getter method for the shared ID
  getSharedId(): string {
    return this.id;
  }

  // Handle HTTP request errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Get gallery data by ID
  getGalleryById(id: string): Observable<any> {
    console.log(id);
    // Construct the URL by combining the API URL and the provided ID
    const url = `${apiUrl}/${id}`;
    return this.http.get<Gallery>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new gallery item along with an image file
  addGallery(gallery: Gallery, file: File): Observable<any> {
    // Create a FormData object to send both the gallery data and the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageDesc', gallery.imageDesc);
    console.log(gallery._id);

    // Create headers and parameters for the HTTP request
    const header = new HttpHeaders();
    const params = new HttpParams();

    // Define request options
    const options = {
      params,
      reportProgress: true,
      headers: header
    };

    // Create an HTTP request with a POST method to add a new gallery item
    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }
}
