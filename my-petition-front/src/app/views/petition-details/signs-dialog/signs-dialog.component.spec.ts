import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignsDialogComponent } from './signs-dialog.component';

describe('SignsDialogComponent', () => {
  let component: SignsDialogComponent;
  let fixture: ComponentFixture<SignsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
