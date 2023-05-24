import { tap } from 'rxjs/operators';
import { LoginRes } from '../../model/reponse.login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admin } from '../../model/adminLogin.modle';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  admin = new BehaviorSubject<Admin>(null!);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  adminLogin(data: LoginRes) {
    return this.http
      .post<LoginRes>('http://localhost:3000/api/login', data)
      .pipe(
        tap((resData) => {
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
    const admin = new Admin(mobile_no, email, role, token, expirationDate);
    this.admin.next(admin);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('adminData', JSON.stringify(admin));
  }

  autoLogin() {
    const userData: {
      mobile_no: string;
      email: string;
      role: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('adminData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new Admin(
      userData.mobile_no,
      userData.email,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.admin.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.admin.next(null!);
    this.router.navigate(['/admin']);
    localStorage.removeItem('adminData');
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
