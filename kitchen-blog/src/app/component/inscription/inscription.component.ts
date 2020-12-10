import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  public showErrorMessage: boolean = false;

  constructor(private authenticationService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home'])
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  inscription() {
    var user: User = new User(this.form.controls.username.value, this.form.controls.password.value);
    this.authenticationService.inscription(user)
      .subscribe(
        result => {
          this.showErrorMessage = false;
          this.login();
        },
        error => this.showErrorMessage = true
      );
  }
  private login() {
    var user: User = new User(this.form.controls.username.value, this.form.controls.password.value);
    this.authenticationService.login(user)
      .subscribe(
        result => {
          this.showErrorMessage = false;
          this.router.navigate(['/home'])
        },
        error => this.showErrorMessage = true
      );
  }

}
