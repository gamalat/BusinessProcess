import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessroletreeComponent } from './processroletree.component';

describe('ProcessroletreeComponent', () => {
  let component: ProcessroletreeComponent;
  let fixture: ComponentFixture<ProcessroletreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessroletreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessroletreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
