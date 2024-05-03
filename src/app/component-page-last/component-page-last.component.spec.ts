import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageLastComponent } from './component-page-last.component';

describe('ComponentPageLastComponent', () => {
  let component: ComponentPageLastComponent;
  let fixture: ComponentFixture<ComponentPageLastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageLastComponent]
    });
    fixture = TestBed.createComponent(ComponentPageLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
