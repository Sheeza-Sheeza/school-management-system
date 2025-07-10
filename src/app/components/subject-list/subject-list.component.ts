import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects: any[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required]
    });
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error(err)
    });
  }

  addSubject(): void {
    if (this.form.invalid) return;

    const subject = { title: this.form.value.title };

    this.subjectService.addSubject(subject).subscribe({
      next: () => {
        this.form.reset();
        this.loadSubjects();
      },
      error: (err) => console.error(err)
    });
  }

  deleteSubject(id: number): void {
    this.subjectService.deleteSubject(id).subscribe({
      next: () => this.loadSubjects(),
      error: (err) => console.error(err)
    });
  }
}
