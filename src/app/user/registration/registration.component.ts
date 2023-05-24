import { AuthService } from '../../allServices/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { phoneValidator } from '../../shared/phoneValidation';
import { matchPasswordValidator } from 'src/app/shared/confirmPasswird';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  hide = true;
  errorSMS: string = '';
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private toast: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        mobile_no: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]*$/),
        ]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
        role: new FormControl('customer', Validators.required),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/
          ),
        ]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      [matchPasswordValidator('password', 'passwordConfirm')]
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const data = this.registerForm.value;
      console.log(data);

      this.auth.register(data).subscribe(
        (data1) => {
          this.isLoading = false;
          this.toast.success(data1.message);
          this.router.navigate(['/user/login']);
        },
        (err) => {
          this.isLoading = false;
          this.toast.warning(err.error.message);
          this.errorSMS = err.error.message;
        }
      );
      this.registerForm.reset();
    } else {
      this.toast.error('Please enter valid data.');
    }
  }

  getControl(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }
  getControl1(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }

  ngOnDestroy() {}
}
