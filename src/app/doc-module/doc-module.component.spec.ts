import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocModuleComponent } from './doc-module.component';

describe('DocModuleComponent', () => {
  let component: DocModuleComponent;
  let fixture: ComponentFixture<DocModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
