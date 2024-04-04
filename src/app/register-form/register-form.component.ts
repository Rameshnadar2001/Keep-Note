import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NoteServiceService } from '../services/note-service.service';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: NoteServiceService, private _snackBar: MatSnackBar) {}

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          ),
        ],
      ],
      gender: [''],
      age: ['', [this.validateAge]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          ),
        ],
      ],
      phone: ['', [Validators.pattern(/^[789]\d{9,9}$/)]],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['', [Validators.pattern(/^\d{5,6}$/)]],
      }),
    },
    { validators: this.mustMatchPassword }
  );

  validateAge(fc: AbstractControl) {
    const ageValue = fc.value;
    if (ageValue < 18) {
      return { invalidAge: true };
    }
    return null;
  }

  mustMatchPassword(fg: AbstractControl) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (!password || !confirmPassword) {
      return null;
    }
    if (password != confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get street() {
    return this.registerForm.get('address')?.get('street');
  }

  get city() {
    return this.registerForm.get('address')?.get('city');
  }

  get state() {
    return this.registerForm.get('address')?.get('state');
  }

  get zipCode() {
    return this.registerForm.get('address')?.get("zipCode");
  }

  onSubmit(){
    let userForm: User = this.registerForm.value as User;
    this.userService.addUser(userForm).subscribe({
      next: (data)=>{
        this._snackBar.open("Congrats!! You have submitted the form!!",'success',{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      },
      error: (error)=>{
        this._snackBar.open(
          'Failed to register user !! Please Try Again Later',
          'Failure',
          {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          }
        );
      }
    });
    
  }
  ngOnInit(): void {}
}
