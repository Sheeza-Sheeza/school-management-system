import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { ClassLectureFormComponent } from './components/class-lecture-form/class-lecture-form.component';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TeacherListComponent, StudentListComponent, SubjectListComponent, ClassLectureFormComponent, EnrollmentFormComponent, EnrollmentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school-management-system';
}
