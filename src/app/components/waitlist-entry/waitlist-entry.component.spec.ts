import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistEntryComponent } from './waitlist-entry.component';

describe('WaitlistEntryComponent', () => {
  let component: WaitlistEntryComponent;
  let fixture: ComponentFixture<WaitlistEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitlistEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitlistEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
