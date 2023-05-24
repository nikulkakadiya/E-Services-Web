import { Subscription } from 'rxjs';
import { AdminAuthService } from './authentication/adminAuth.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private adminSub!: Subscription;
  isAuthenticated = false;
  // email!:string;
  opened = false;

  constructor(private adminAuthService: AdminAuthService) {}
  ngOnInit() {
    this.adminAuthService.autoLogin();
    this.adminSub = this.adminAuthService.admin.subscribe((admin) => {
      this.isAuthenticated = !!admin;
      // this.email=admin.email;
    });
  }

  logOut() {
    this.adminAuthService.logout();
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
  }
}
