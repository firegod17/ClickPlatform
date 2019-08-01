import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfiphotoComponent } from './selfiphoto.component';

describe('SelfiphotoComponent', () => {
  let component: SelfiphotoComponent;
  let fixture: ComponentFixture<SelfiphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfiphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfiphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
