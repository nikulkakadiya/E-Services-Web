import { AdminAuthService } from '../authentication/adminAuth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
    private adminSub!: Subscription;
    isAuthenticated = false;

    constructor(private adminAuthService: AdminAuthService) {
    }

    ngOnInit() {
        this.adminSub = this.adminAuthService.admin.subscribe((admin) => {
            this.isAuthenticated = !!admin;
        })
    }
    ngOnDestroy() {
        this.adminSub.unsubscribe();
    }
}
