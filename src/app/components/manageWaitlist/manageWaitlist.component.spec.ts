import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { manageWaitlistComponent } from './manageWaitlist.component';

describe('manageWaitlistComponent', () => {
  let component: manageWaitlistComponent;
  let fixture: ComponentFixture<manageWaitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ manageWaitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(manageWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
