import { Component, OnInit } from '@angular/core';
import { AuthService } from './allServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'user';
  constructor(private authService: AuthService) {}

  ngOnInit() {
      console.log('public sms');
    this.authService.autoLogin();
  }
}
