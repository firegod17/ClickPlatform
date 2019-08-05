import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndoForAmountComponent } from './indo-for-amount.component';

describe('IndoForAmountComponent', () => {
  let component: IndoForAmountComponent;
  let fixture: ComponentFixture<IndoForAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndoForAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndoForAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
