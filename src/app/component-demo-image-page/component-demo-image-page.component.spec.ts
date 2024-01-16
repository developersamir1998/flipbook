import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDemoImagePageComponent } from './component-demo-image-page.component';

describe('ComponentDemoImagePageComponent', () => {
  let component: ComponentDemoImagePageComponent;
  let fixture: ComponentFixture<ComponentDemoImagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentDemoImagePageComponent]
    });
    fixture = TestBed.createComponent(ComponentDemoImagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
