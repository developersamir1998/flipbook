import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageThirdComponent } from './component-page-third.component';

describe('ComponentPageThirdComponent', () => {
  let component: ComponentPageThirdComponent;
  let fixture: ComponentFixture<ComponentPageThirdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageThirdComponent]
    });
    fixture = TestBed.createComponent(ComponentPageThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
