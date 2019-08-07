import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextstepComponent } from './nextstep.component';

describe('NextstepComponent', () => {
  let component: NextstepComponent;
  let fixture: ComponentFixture<NextstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextstepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
