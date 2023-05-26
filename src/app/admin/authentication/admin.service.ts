import { LoginRes } from './../../model/reponse.login';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/model/profile.model';
import { UserDetails } from 'src/app/model/user.model';

@Injectable()
export class AdminService {
  adminURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private router: Router) {}

  adminProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.adminURL}/users/userProfile`);
  }

  getAllUsers(page: number, limit: number): Observable<UserDetails> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http
      .get<UserDetails>(`${this.adminURL}/users`, { params })
      .pipe(
        map((resData: UserDetails) => resData),
        catchError((err) => throwError(err))
      );
  }
}
