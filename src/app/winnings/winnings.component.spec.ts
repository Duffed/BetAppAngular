import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningsComponent } from './winnings.component';

describe('WinningsComponent', () => {
  let component: WinningsComponent;
  let fixture: ComponentFixture<WinningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
