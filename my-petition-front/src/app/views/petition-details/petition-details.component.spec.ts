import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionDetailsComponent } from './petition-details.component';

describe('PetitionDetailsComponent', () => {
  let component: PetitionDetailsComponent;
  let fixture: ComponentFixture<PetitionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
