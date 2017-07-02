import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetitionComponent } from './new-petition.component';

describe('NewPetitionComponent', () => {
  let component: NewPetitionComponent;
  let fixture: ComponentFixture<NewPetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
