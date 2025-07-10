import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'http://localhost:7000/api/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addSubject(subject: any): Observable<any> {
    return this.http.post(this.apiUrl, subject);
  }

  updateSubject(id: number, subject: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
