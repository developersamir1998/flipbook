import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFeedbackFormPageComponent } from './component-feedback-form-page.component';

describe('ComponentFeedbackFormPageComponent', () => {
  let component: ComponentFeedbackFormPageComponent;
  let fixture: ComponentFixture<ComponentFeedbackFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentFeedbackFormPageComponent]
    });
    fixture = TestBed.createComponent(ComponentFeedbackFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
