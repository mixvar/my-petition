import { TestBed, inject } from '@angular/core/testing';

import { PetitionsService } from './petitions.service';

describe('PetitionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetitionsService]
    });
  });

  it('should be created', inject([PetitionsService], (service: PetitionsService) => {
    expect(service).toBeTruthy();
  }));
});
