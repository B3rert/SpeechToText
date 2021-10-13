import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOptionComponent } from './dialog-option.component';

describe('DialogOptionComponent', () => {
  let component: DialogOptionComponent;
  let fixture: ComponentFixture<DialogOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
