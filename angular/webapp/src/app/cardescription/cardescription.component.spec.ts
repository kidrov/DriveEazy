import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cardescriptionComponent } from './cardescription.component';

describe('CardescriptionComponent', () => {
  let component: cardescriptionComponent;
  let fixture: ComponentFixture<cardescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cardescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cardescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
