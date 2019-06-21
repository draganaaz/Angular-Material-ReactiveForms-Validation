import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../infrastructure/cross-field-error-matcher';
import { passwordsMatch } from '../infrastructure/passwords-match.validator';
import { FormComponentBase } from '../infrastructure/form-component-base';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('currentPassword') firstItem: ElementRef;

  form!: FormGroup;
  hidePassword: boolean = true;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private formBuilder: FormBuilder) {
    super();

    this.validationMessages = {
      currentPassword: {
        required: 'Current password is required.',
        minlength: 'Current password minimum length is 6.',
        maxlength: 'Current password maximum length is 15.',
        pattern: 'Current password minimum length 6, requires one letter, one number, one special character !@#$%^&* no spaces.'
      },
      newPassword: {
        required: 'New password is required.',
        minlength: 'New password minimum length is 6.',
        maxlength: 'New password maximum length is 15.',
        pattern: 'New password minimum length 6, requires one letter, one number, one special character !@#$%^&* no spaces.',
        passwordsMatch: 'Passwords must be different.'
      }
    };

    this.formErrors = {
      currentPassword: '',
      newPassword: ''
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]]
    }, { validators: passwordsMatch });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  changePasswordClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Password Change Complete');
  }
}
