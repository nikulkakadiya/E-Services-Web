import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from '../authentication/admin.service';
import { map, tap } from 'rxjs';
import { UserDetails } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'mobile_no',
    'email',
    'role',
    'user_status',
  ];
  pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  page: number = 1;
  limit: number = 5;
  pageEvent!: PageEvent;
  public dataSource: any = null!;
  addSubject!: FormGroup;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser(page: number = 1, limit: number = 5) {
    this.adminService
      .getAllUsers(page, limit)
      .pipe(
        tap((resData) => console.log(resData)),
        map((resData: UserDetails) => (this.dataSource = resData))
      )
      .subscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.page = e.pageIndex;
    this.limit = e.pageSize;
    this.page += 1;
    this.getAllUser(this.page, this.limit);
  }
}
