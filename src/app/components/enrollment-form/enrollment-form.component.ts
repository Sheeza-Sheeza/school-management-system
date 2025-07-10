import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { ClassLectureService } from '../../services/class-lecture.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {

  form!: FormGroup;
  students: any[] = [];
  classLectures: any[] = [];

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private classLectureService: ClassLectureService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      studentId: [null, Validators.required],
      classLectureId: [null, Validators.required]
    });

    this.loadStudents();
    this.loadClassLectures();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }

  loadClassLectures(): void {
    this.classLectureService.getClassLectures().subscribe({
      next: (data) => this.classLectures = data,
      error: (err) => console.error(err)
    });
  }

  enroll(): void {
    if (this.form.invalid) return;

    this.enrollmentService.enrollStudent(this.form.value).subscribe({
      next: () => {
        alert('Student enrolled successfully!');
        this.form.reset();
      },
      error: (err) => console.error(err)
    });
  }
}
