import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTipsComponent } from './saved-tips.component';

describe('SavedTipsComponent', () => {
  let component: SavedTipsComponent;
  let fixture: ComponentFixture<SavedTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
