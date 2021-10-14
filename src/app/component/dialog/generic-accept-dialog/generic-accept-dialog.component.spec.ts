import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAcceptDialogComponent } from './generic-accept-dialog.component';

describe('GenericAcceptDialogComponent', () => {
  let component: GenericAcceptDialogComponent;
  let fixture: ComponentFixture<GenericAcceptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericAcceptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAcceptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
