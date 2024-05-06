import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageFiveComponent } from './component-page-five.component';

describe('ComponentPageFiveComponent', () => {
  let component: ComponentPageFiveComponent;
  let fixture: ComponentFixture<ComponentPageFiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageFiveComponent]
    });
    fixture = TestBed.createComponent(ComponentPageFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
