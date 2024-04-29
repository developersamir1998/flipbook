import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageFourComponent } from './component-page-four.component';

describe('ComponentPageFourComponent', () => {
  let component: ComponentPageFourComponent;
  let fixture: ComponentFixture<ComponentPageFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageFourComponent]
    });
    fixture = TestBed.createComponent(ComponentPageFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
