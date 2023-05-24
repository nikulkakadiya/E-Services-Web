import { AdminAuthService } from '../authentication/adminAuth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private adminSub!: Subscription;
    isAuthenticated = false;

    constructor(private adminAuthService: AdminAuthService) {
    }

    ngOnInit() {
        this.adminSub = this.adminAuthService.admin.subscribe((admin) => {
            this.isAuthenticated = !!admin;
        })
    }

    logOut() {
        this.adminAuthService.logout();
    }

    ngOnDestroy(){
        this.adminSub.unsubscribe();
    }


}
