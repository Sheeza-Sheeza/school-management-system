import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [];
  form!: FormGroup;

  // ✅ These variables manage update mode
  isEditMode: boolean = false;
  editingTeacherId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => this.teachers = data,
      error: (err) => console.error(err)
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const teacher = { name: this.form.value.name };

    if (this.isEditMode && this.editingTeacherId !== null) {
      // ✅ Update teacher
      this.teacherService.updateTeacher(this.editingTeacherId, teacher).subscribe({
        next: () => {
          this.resetForm();
          this.loadTeachers();
        },
        error: (err) => console.error(err)
      });
    } else {
      // ✅ Add new teacher
      this.teacherService.addTeacher(teacher).subscribe({
        next: () => {
          this.resetForm();
          this.loadTeachers();
        },
        error: (err) => console.error(err)
      });
    }
  }

  editTeacher(teacher: any): void {
    this.form.patchValue({ name: teacher.name });
    this.isEditMode = true;
    this.editingTeacherId = teacher.id;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
    this.isEditMode = false;
    this.editingTeacherId = null;
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe({
      next: () => this.loadTeachers(),
      error: (err) => console.error(err)
    });
  }
}
