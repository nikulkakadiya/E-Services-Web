import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from 'src/app/allServices/post.service';
import { Profile } from '../../model/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userData: any = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.userProfile();
  }
  userProfile() {
    this.postService.userProfile().subscribe(
      (resData) => {
        this.userData = resData;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
