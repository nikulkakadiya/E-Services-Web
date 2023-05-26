import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { phoneValidator } from '../../shared/phoneValidation';
import { AuthService } from '../../allServices/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[1-9]\d{9}$/),
      ]),
      //   email: new FormControl('', [
      //     Validators.required,
      //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      //   ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/
        ),
      ]),
      role: new FormControl('customer', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (resData) => {
          this.isLoading = false;
          this.toast.success(resData.message);
          this.router.navigate(['/user/services']);
        },
        (err) => {
          this.isLoading = false;
          this.toast.error(err.error.message);
          this.errorSMS = err.error.message;
        }
      );
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
