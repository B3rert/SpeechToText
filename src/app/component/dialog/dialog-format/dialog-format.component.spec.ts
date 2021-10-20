import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormatComponent } from './dialog-format.component';

describe('DialogFormatComponent', () => {
  let component: DialogFormatComponent;
  let fixture: ComponentFixture<DialogFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
