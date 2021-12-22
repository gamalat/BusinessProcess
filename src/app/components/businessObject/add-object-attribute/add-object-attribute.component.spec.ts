import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectAttributeComponent } from './add-object-attribute.component';

describe('AddObjectAttributeComponent', () => {
  let component: AddObjectAttributeComponent;
  let fixture: ComponentFixture<AddObjectAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddObjectAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObjectAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
