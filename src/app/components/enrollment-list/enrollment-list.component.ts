import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {

  enrollments: any[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe({
      next: (data) => this.enrollments = data,
      error: (err) => console.error(err)
    });
  }
}
