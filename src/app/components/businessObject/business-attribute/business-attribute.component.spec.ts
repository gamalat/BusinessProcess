import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAttributeComponent } from './business-attribute.component';

describe('BusinessAttributeComponent', () => {
  let component: BusinessAttributeComponent;
  let fixture: ComponentFixture<BusinessAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
