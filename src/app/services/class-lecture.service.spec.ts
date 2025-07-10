import { TestBed } from '@angular/core/testing';

import { ClassLectureService } from './class-lecture.service';

describe('ClassLectureService', () => {
  let service: ClassLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
