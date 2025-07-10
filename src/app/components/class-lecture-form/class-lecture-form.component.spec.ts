import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLectureFormComponent } from './class-lecture-form.component';

describe('ClassLectureFormComponent', () => {
  let component: ClassLectureFormComponent;
  let fixture: ComponentFixture<ClassLectureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLectureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLectureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
