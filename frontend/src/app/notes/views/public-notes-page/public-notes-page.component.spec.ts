import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNotesPageComponent } from './public-notes-page.component';

describe('PublicNotesPageComponent', () => {
  let component: PublicNotesPageComponent;
  let fixture: ComponentFixture<PublicNotesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNotesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
