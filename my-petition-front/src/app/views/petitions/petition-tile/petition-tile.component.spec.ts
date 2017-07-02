import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionTileComponent } from './petition-tile.component';

describe('PetitionTileComponent', () => {
  let component: PetitionTileComponent;
  let fixture: ComponentFixture<PetitionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
