import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirststepComponent } from './firststep.component';

describe('FirststepComponent', () => {
  let component: FirststepComponent;
  let fixture: ComponentFixture<FirststepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirststepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirststepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
