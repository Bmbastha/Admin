import { TestBed } from '@angular/core/testing';

import { EditsubitemsService } from './editsubitems.service';

describe('EditsubitemsService', () => {
  let service: EditsubitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditsubitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
