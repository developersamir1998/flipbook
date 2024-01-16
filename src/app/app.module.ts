//This code defines the Angular application module (AppModule) and 
//provides a list of components, modules, and services that are used in the application.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFrontCoverPageComponent } from './component-front-cover-page/component-front-cover-page.component';
import { ComponentFeedbackPageComponent } from './component-feedback-page/component-feedback-page.component';
import { ComponentDemoImagePageComponent } from './component-demo-image-page/component-demo-image-page.component';
import { ComponentFeedbackFormPageComponent } from './component-feedback-form-page/component-feedback-form-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentFrontCoverPageComponent,
    ComponentFeedbackPageComponent,
    ComponentDemoImagePageComponent,
    ComponentFeedbackFormPageComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



