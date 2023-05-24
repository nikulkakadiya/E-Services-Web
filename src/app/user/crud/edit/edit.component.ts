import { SubjectType } from './../add/add.component';
import { PostService } from '../../../allServices/post.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editSubject!: FormGroup;
  subjectId!: string;
  constructor(
    private route: ActivatedRoute,
    private tost: ToastrService,
    private postService: PostService,
    private roter: Router
  ) {}

  ngOnInit() {
    this.subjectId = this.route.snapshot.params['id'];
    this.findSubjectById();
    this.editSubject = new FormGroup({
      name: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
    });
  }

  findSubjectById() {
    if (this.subjectId) {
      this.postService.findSubjectById(this.subjectId).subscribe(
        (resData) => {
          this.formFill(resData.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.tost.error('Please Try Again...');
    }
  }

  formFill(data: any) {
    this.editSubject.setValue({ name: data.name, courseName: data.courseName });
  }

  onSubmit() {
    if (this.editSubject.valid) {
      this.postService
        .updateSubject(this.subjectId, this.editSubject.value)
        .subscribe(
          (resData) => {
            this.tost.success(resData.message);
            this.roter.navigate(['/crud']);
          },
          (err) => {
            this.tost.error(err.error.message);
          }
        );
    } else {
      this.tost.error('Please valid data');
    }
  }
}
