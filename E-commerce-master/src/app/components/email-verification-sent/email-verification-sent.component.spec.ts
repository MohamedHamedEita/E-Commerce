import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationSentComponent } from './email-verification-sent.component';

describe('EmailVerificationSentComponent', () => {
  let component: EmailVerificationSentComponent;
  let fixture: ComponentFixture<EmailVerificationSentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationSentComponent]
    });
    fixture = TestBed.createComponent(EmailVerificationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
