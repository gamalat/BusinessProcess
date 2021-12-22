import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessrolesearchComponent } from './processrolesearch.component';

describe('ProcessrolesearchComponent', () => {
  let component: ProcessrolesearchComponent;
  let fixture: ComponentFixture<ProcessrolesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessrolesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessrolesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
