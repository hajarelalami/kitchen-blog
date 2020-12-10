import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  isAuthenticated$: Observable<boolean>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.userService.isAuthenticationSubject;
  }

  signOut() {
    this.userService.signOut();
  }

}
