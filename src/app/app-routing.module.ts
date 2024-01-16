// This code defines a routing configuration for the Angular application. 
// It sets up routes that determine which component should be displayed for different URLs 
// /within the application. Each route is associated with a specific component, 
// and some routes also accept dynamic parameters (e.g., :id) for more dynamic behavior. 
// The ImageService is provided as a service available to components throughout the application.



// Import necessary modules and components from Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// Import various components for routing


// Define an array of route configurations
const routes: Routes = [
  
  
];

// Create an NgModule to configure and manage routing
@NgModule({
  // Import the defined route configurations
  imports: [RouterModule.forRoot(routes)],
  // Export the RouterModule for use in the application
  exports: [RouterModule],
  // Provide the ImageService to be available to components
 
})
export class AppRoutingModule { }

