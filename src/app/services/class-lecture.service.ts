import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassLectureService {

  private apiUrl = 'http://localhost:7000/api/classlectures';

  constructor(private http: HttpClient) { }

  getClassLectures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addClassLecture(lecture: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, lecture);
  }
}
