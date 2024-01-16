import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-demo-image-page',
  templateUrl: './component-demo-image-page.component.html',
  styleUrls: ['./component-demo-image-page.component.css']
})
export class ComponentDemoImagePageComponent implements OnInit {
  imageUrls: string[] = [
    '../assets/images/image1.jpg',
    '../assets/images/image2.jpg',
    '../assets/images/image3.jpg',
    '../assets/images/image4.jpg'
  ];

  currentImageIndex: number = 0;

  ngOnInit(): void {
    this.startImageInterval();
  }

  startImageInterval(): void {
    setInterval(() => {
      this.showNextImage();
    }, 2000); // 1000 milliseconds = 1 second
  }

  showNextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
  }

}
