import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from 'src/app/allServices/post.service';
import { Profile } from '../../model/profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userData: any = [];
  profileUpload!: FormGroup;
  // address!: FormGroup;
  selectedFile!: File;
  constructor(private postService: PostService, private toast: ToastrService) {}

  ngOnInit() {
    this.profileUpload = new FormGroup({
      userProfile: new FormControl('', [Validators.required]),
    });
    this.userProfile();
  }
  userProfile() {
    this.postService.userProfile().subscribe(
      (resData) => {
        this.userData = resData;
        console.log(resData);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('userProfile', this.selectedFile);
    console.log(this.selectedFile);
    if (this.profileUpload.valid) {
      this.postService.profileUpload(formData).subscribe(
        (resData) => {
          console.log(resData);
          this.userProfile();
          this.toast.success(resData.message);
        },
        (err) => {
          this.toast.error(err.error.message);
        }
      );
    } else {
      this.toast.error('Please upload image.');
    }
    this.profileUpload.reset();
  }

  // onAddress() {}
}
