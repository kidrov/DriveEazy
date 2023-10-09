import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotVerificationComponent } from './forgot-verification.component';

describe('ForgotVerificationComponent', () => {
  let component: ForgotVerificationComponent;
  let fixture: ComponentFixture<ForgotVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotVerificationComponent]
    });
    fixture = TestBed.createComponent(ForgotVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
