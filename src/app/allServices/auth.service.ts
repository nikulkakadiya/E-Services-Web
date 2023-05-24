import { Router } from '@angular/router';
import { User } from './../model/login.modle';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { RegistrationRes } from '../model/response.registration';
import { Registration } from '../model/registration.model';
import { LoginRes } from '../model/reponse.login';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = 'http://localhost:3000';
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}
  register(data: Registration) {
    return this.http.post<Registration>(`${this.URL}/api/registration`, data);
  }

  login(data: LoginRes) {
    return this.http.post<LoginRes>(`${this.URL}/api/login`, data).pipe(
      tap((resData: LoginRes) => {
        this.handleAuthentication(
          resData.mobile_no,
          resData.email,
          resData.role,
          resData.token
        );
      })
    );
  }

  private handleAuthentication(
    mobile_no: string,
    email: string,
    role: string,
    token: string
  ) {
    const expiresIn = 3600;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(mobile_no, email, role, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      mobile_no: string;
      email: string;
      role: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.mobile_no,
      userData.email,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/user/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // console.log("test",expirationDuration);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
