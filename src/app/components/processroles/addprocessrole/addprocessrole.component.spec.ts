import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprocessroleComponent } from './addprocessrole.component';

describe('AddprocessroleComponent', () => {
  let component: AddprocessroleComponent;
  let fixture: ComponentFixture<AddprocessroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprocessroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprocessroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
