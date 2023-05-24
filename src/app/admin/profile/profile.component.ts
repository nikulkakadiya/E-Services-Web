import { map } from 'rxjs/operators';
import { LoginRes } from './../../model/reponse.login';
import { AdminService } from './../authentication/admin.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  adminProfile: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.aProfile();
  }
  aProfile() {
    this.adminService.adminProfile().subscribe(
      (resData) => {
        this.adminProfile = resData;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
