import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core';
import { Subscription } from 'rxjs';
import * as $ from 'jquery'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup;
  isNextForm = false;
  subscription: Subscription;
  username = null;

  constructor(
    public authSerivce: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  saveForm(form: FormGroup) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    return true;
  }

  login() {
    if (this.saveForm(this.loginForm)) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.subscription = this.authSerivce.auth(username, password).subscribe(async res => {
        if (res && res.code === 200) {
          this.username = res.result.username;
          $('.btn-close-login').trigger('click');
        }
      },
        error => {

        }
      );
    }
  }

  logout() {
    this.username = null;
    this.router.navigate(['/']);
  }

}
