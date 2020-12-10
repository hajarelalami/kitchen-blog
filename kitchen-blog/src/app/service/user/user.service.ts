import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from 'src/app/model/credentials-model';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8081';

  isAuthenticationSubject = new BehaviorSubject<any>({ status: false });

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router) {
    if (this.storage.get("token")) {
      this.isAuthenticationSubject.next({ status: true });
    } else {
      this.isAuthenticationSubject.next({ status: false });
    }
  }

  login(credientials: Credentials) {
    return this.http.post<any>(this.url + '/authenticate', credientials)
      .pipe(
        map(result => {
          this.isAuthenticationSubject.next({ status: true });
          this.storage.set("token", result.token);
        }),
        catchError(error => {
          this.clearToken();
          return throwError(error)
        })
      );
  }

  inscription(user: User) {
    return this.http.post<UserInfo>(this.url + '/create', user);
  }

  clearToken() {
    this.storage.remove("token");
    this.isAuthenticationSubject.next({ status: false })
  }

  public isAuthenticated(): boolean {
    if (this.storage.get("token")) {
      return true;
    }
    return false;
  }

  getTocken(): string {
    return this.storage.get("token");
  }

  signOut() {
    this.clearToken();
    this.router.navigate(["Home"])
  }

}
