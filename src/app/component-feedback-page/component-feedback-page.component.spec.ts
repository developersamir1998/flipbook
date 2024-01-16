import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFeedbackPageComponent } from './component-feedback-page.component';

describe('ComponentFeedbackPageComponent', () => {
  let component: ComponentFeedbackPageComponent;
  let fixture: ComponentFixture<ComponentFeedbackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentFeedbackPageComponent]
    });
    fixture = TestBed.createComponent(ComponentFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
