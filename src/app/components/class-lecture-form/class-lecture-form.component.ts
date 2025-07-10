import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassLectureService } from '../../services/class-lecture.service';
import { TeacherService } from '../../services/teacher.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-class-lecture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-lecture-form.component.html',
  styleUrls: ['./class-lecture-form.component.css']
})
export class ClassLectureFormComponent implements OnInit {

  form!: FormGroup;
  teachers: any[] = [];
  subjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private classLectureService: ClassLectureService,
    private teacherService: TeacherService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      teacherId: [null, Validators.required],
      subjectId: [null, Validators.required]
    });

    this.loadTeachers();
    this.loadSubjects();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => this.teachers = data,
      error: (err) => console.error(err)
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error(err)
    });
  }

  addClassLecture(): void {
    if (this.form.invalid) return;

    const classLecture = {
      teacherId: this.form.value.teacherId,
      subjectId: this.form.value.subjectId
    };

    this.classLectureService.addClassLecture(classLecture).subscribe({
      next: () => {
        alert('Class Lecture added successfully!');
        this.form.reset();
      },
      error: (err) => console.error(err)
    });
  }
}
