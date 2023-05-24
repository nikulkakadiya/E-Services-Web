import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AdminAuthService } from './adminAuth.service';

@Injectable()
export class AdminInterceptorService implements HttpInterceptor {
  constructor(private adminAuthService: AdminAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.adminAuthService.admin.pipe(
      take(1),
      exhaustMap((admin: any) => {
        if (!admin) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // params: new HttpParams().set('auth', user.token)
          headers: new HttpHeaders({
            authorization: `Bearer ${admin.token}`,
          }),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
