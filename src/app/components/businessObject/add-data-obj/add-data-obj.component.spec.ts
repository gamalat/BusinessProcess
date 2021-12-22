import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataObjComponent } from './add-data-obj.component';

describe('AddDataObjComponent', () => {
  let component: AddDataObjComponent;
  let fixture: ComponentFixture<AddDataObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
