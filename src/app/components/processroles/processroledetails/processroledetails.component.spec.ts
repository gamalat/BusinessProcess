import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessroledetailsComponent } from './processroledetails.component';

describe('ProcessroledetailsComponent', () => {
  let component: ProcessroledetailsComponent;
  let fixture: ComponentFixture<ProcessroledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessroledetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessroledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
