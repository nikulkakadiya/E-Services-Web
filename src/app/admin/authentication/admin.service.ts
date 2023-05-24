import { LoginRes } from './../../model/reponse.login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/model/profile.model';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  adminProfile(): Observable<Profile> {
    return this.http.get<Profile>(
      'http://localhost:3000/api/users/userProfile'
    );
  }
}
