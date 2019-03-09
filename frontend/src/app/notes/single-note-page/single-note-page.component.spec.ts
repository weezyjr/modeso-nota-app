import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNotePageComponent } from './single-note-page.component';

describe('SingleNotePageComponent', () => {
  let component: SingleNotePageComponent;
  let fixture: ComponentFixture<SingleNotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
