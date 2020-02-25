import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipDialogComponent } from './add-tip-dialog.component';

describe('AddTipDialogComponent', () => {
  let component: AddTipDialogComponent;
  let fixture: ComponentFixture<AddTipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
