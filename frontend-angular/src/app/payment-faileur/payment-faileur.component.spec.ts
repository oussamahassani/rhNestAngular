import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFaileurComponent } from './payment-faileur.component';

describe('PaymentFaileurComponent', () => {
  let component: PaymentFaileurComponent;
  let fixture: ComponentFixture<PaymentFaileurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFaileurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFaileurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
