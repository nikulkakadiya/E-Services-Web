import { map, catchError } from 'rxjs/operators';
// import { SubjectType } from './../../../sample-code/add.component';
import { SubjectType } from '../user/crud/add/add.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Profile } from '../model/profile.model';
const endpoint = 'https://jsonplaceholder.typicode.com/posts';

@Injectable()
export class PostService {
  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(endpoint);
  }

  getAllSubject(page: number, limit: number): Observable<SubjectType> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    return this.http
      .get<SubjectType>('http://localhost:3000/subject/findSubject', { params })
      .pipe(
        map((resData: SubjectType) => resData),
        catchError((err) => throwError(err))
      );
  }

  addSubject(sub: any): Observable<any> {
    return this.http.post('http://localhost:3000/subject/addSubject', sub);
  }

  findSubjectById(id: any): Observable<any> {
    return this.http.get('http://localhost:3000/subject/findSubjectById/' + id);
  }
  updateSubject(id: any, data: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/subject/${id}`, data);
  }
  deleteSubject(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/subject/${id}`);
  }

  userProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.URL}/api/users/userProfile`);
  }
}
