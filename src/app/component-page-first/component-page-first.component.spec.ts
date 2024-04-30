import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageFirstComponent } from './component-page-first.component';

describe('ComponentPageFirstComponent', () => {
  let component: ComponentPageFirstComponent;
  let fixture: ComponentFixture<ComponentPageFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentPageFirstComponent]
    });
    fixture = TestBed.createComponent(ComponentPageFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
