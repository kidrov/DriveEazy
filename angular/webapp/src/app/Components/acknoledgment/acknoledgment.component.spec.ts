import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknoledgmentComponent } from './acknoledgment.component';

describe('AcknoledgmentComponent', () => {
  let component: AcknoledgmentComponent;
  let fixture: ComponentFixture<AcknoledgmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcknoledgmentComponent]
    });
    fixture = TestBed.createComponent(AcknoledgmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
