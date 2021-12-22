import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessObjectComponent } from './add-business-object.component';

describe('AddBusinessObjectComponent', () => {
  let component: AddBusinessObjectComponent;
  let fixture: ComponentFixture<AddBusinessObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
