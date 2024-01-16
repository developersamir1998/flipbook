import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFrontCoverPageComponent } from './component-front-cover-page.component';

describe('ComponentFrontCoverPageComponent', () => {
  let component: ComponentFrontCoverPageComponent;
  let fixture: ComponentFixture<ComponentFrontCoverPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentFrontCoverPageComponent]
    });
    fixture = TestBed.createComponent(ComponentFrontCoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
