import { AdminAuthService } from './adminAuth.service';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
    constructor(private adminAuthService:AdminAuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        const expectedRole = route.data['expectedRole'];
        return this.adminAuthService.admin.pipe(
            take(1),
            map((admin) => {
                console.log(admin);
                const isAuth = !!admin;

                if (isAuth && admin.role === expectedRole) {
                  console.log('ok');
                    return true;
                }
                console.log('not ok');

                return this.router.createUrlTree(['/admin']);
            })
            // tap(isAuth => {
            //   if (!isAuth) {
            //     this.router.navigate(['/auth']);
            //   }
            // })
        );
    }
}
