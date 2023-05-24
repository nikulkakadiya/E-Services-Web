import { AdminComponent } from './../admin.component';
import { Router } from '@angular/router';
import { AdminAuthService } from '../authentication/adminAuth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorSMS: string = '';
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private toast: ToastrService,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]*$/),
      ]),
      // email: new FormControl('', [
      //     Validators.required,
      //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      // ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/
        ),
      ]),
      role: new FormControl('admin', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.adminAuthService.adminLogin(this.loginForm.value).subscribe(
        (resData) => {
          this.isLoading = false;
          this.toast.success('login sucess..');
          this.router.navigate(['/admin/home']);
        },
        (err) => {
          this.isLoading = false;
          this.toast.error(err.error.message);
          this.errorSMS = err.error.message;
        }
      );
      console.log(this.loginForm.value);

      this.loginForm.reset();
    } else {
      this.toast.error('Please enter valid data.');
    }
  }
  getControl(name: string): AbstractControl | null {
    return this.loginForm.get(name);
  }
  getControl1(name: string): AbstractControl | null {
    return this.loginForm.get(name);
  }
}
