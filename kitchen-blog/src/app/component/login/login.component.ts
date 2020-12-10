import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from 'src/app/model/credentials-model';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  public showErrorMessage: boolean = false;
  isAuthenticated: boolean;
  authenticationSubscription = new Subscription();


  constructor(
    private authenticationService: UserService,
    private router: Router) { }


  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home'])
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    var crediantial: Credentials = new Credentials(this.form.controls.username.value, this.form.controls.password.value);
    this.authenticationService.login(crediantial)
      .subscribe(
        result => {
          this.showErrorMessage = false;
          this.router.navigate(['/home'])
        },
        error => {
          this.showErrorMessage = true
          this.router.navigate
        }
      );
  }

  navigateToInscriptionPage() {
    this.router.navigate(['/inscription'])
  }
  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
  }

}
