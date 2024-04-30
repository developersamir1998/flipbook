import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageSecondComponent } from './component-page-second.component';

describe('ComponentPageSecondComponent', () => {
  let component: ComponentPageSecondComponent;
  let fixture: ComponentFixture<ComponentPageSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageSecondComponent]
    });
    fixture = TestBed.createComponent(ComponentPageSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
