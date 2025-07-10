import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }

  addStudent(): void {
    if (this.form.invalid) return;

    const student = { name: this.form.value.name };

    this.studentService.addStudent(student).subscribe({
      next: () => {
        this.form.reset();
        this.loadStudents();
      },
      error: (err) => console.error(err)
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: (err) => console.error(err)
    });
  }
}
