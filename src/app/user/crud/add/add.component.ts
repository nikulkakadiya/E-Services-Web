import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../allServices/post.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  displayedColumns: string[] = ['name', 'courseName', 'action'];
  pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  page: number = 1;
  limit: number = 5;
  pageEvent!: PageEvent;
  public dataSource: SubjectType = null!;
  addSubject!: FormGroup;

  constructor(private postService: PostService, private toast: ToastrService) {}

  ngOnInit() {
    this.addSubject = new FormGroup({
      name: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
    });
    this.fetchSubject();
  }

  fetchSubject(page: number = 1, limit: number = 5) {
    this.postService
      .getAllSubject(page, limit)
      .pipe(
        tap((users) => console.log(users)),
        map((resData: SubjectType) => (this.dataSource = resData))
      )
      .subscribe();
  }

  onSubmit() {
    if (this.addSubject.valid) {
      this.postService.addSubject(this.addSubject.value).subscribe(
        (resData) => {
          this.toast.success(resData.message);
          this.fetchSubject(this.page, this.limit);
        },
        (err) => {
          this.toast.warning(err.error.message);
        }
      );
    } else {
      this.toast.error('Please fill all fields');
    }
    this.addSubject.reset();
  }
  deleteSubject(id: any) {
    this.postService.deleteSubject(id).subscribe(
      (resData) => {
        this.toast.success(resData.message);
      },
      (err) => {
        this.toast.error(err.error.message);
      }
    );
    this.fetchSubject(this.page, this.limit);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.page = e.pageIndex;
    this.limit = e.pageSize;
    this.page += 1;
    // console.log(page + " " + limit);
    this.fetchSubject(this.page, this.limit);
    // this.postService.getAllSubject(page, limit).pipe(
    //     map((resData: SubjectType) => this.dataSource = resData)
    // ).subscribe();
  }
}

export interface SubjectType {
  status: 'success';
  result: Result[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface Result {
  id: string;
  name: string;
  courseName: string;
}
