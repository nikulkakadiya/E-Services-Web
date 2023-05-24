import { AuthService } from './auth.service';
import { User } from '../model/login.modle';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams,
    HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user: any) => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    // params: new HttpParams().set('auth', user.token)
                    headers: new HttpHeaders({
                        authorization: `Bearer ${user.token}`,
                    }),
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
