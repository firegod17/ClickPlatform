import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPasswordComponent } from './my-password.component';

describe('MyPasswordComponent', () => {
  let component: MyPasswordComponent;
  let fixture: ComponentFixture<MyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
