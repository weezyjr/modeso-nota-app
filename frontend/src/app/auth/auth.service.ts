import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestObject } from '../models/Request';
import { take, map } from 'rxjs/operators';
import { ResponseObject } from '../models/Response';

// retrive the environment variable `api host` which stands for the backend url
const apiHost = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // endpoints
  private loginEndPoint = apiHost + 'user/login';
  private registerEndPoint = apiHost + 'user/register';


  // Current Logged in User Subject
  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject(null);


  // Extract the current user value
  public get currentUser(): User | null {
    if (this.currentUser$) {
      return this.currentUser$.value;
    } else {
      return null;
    }
  }


  // Set the subject value to the passed user
  public set currentUser(user: User | null) {
    if (this.currentUser$) {
      this.currentUser$.next(user);
    } else {
      this.currentUser$ = new BehaviorSubject(user);
    }
  }


  // Inject httpClient service
  constructor(private http: HttpClient) {
    // to check if the user is logged in
    this.retriveUser();
  }


  // copy the user object and store it in the currentUser subject
  private retriveUser() {
    // Get the user object from the local storage
    const retrivedUser: User = JSON.parse(localStorage.getItem('currentUser')) as User;
    // if the user is valid, store it in currentUser subject
    if (retrivedUser && retrivedUser.jwt) {
      this.currentUser = retrivedUser;
    }
  }


  // store the user object in currentUser subject and in local storage
  private storeUser(user: User) {
    if (user && user.jwt) {
      // store user in currentUser subject
      this.currentUser = user;
      // store user in the local storage
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }


  // remove user from local
  private removeUser() {
    // delete current user
    this.currentUser = null;

    // delete localstorage 'currentUser'
    localStorage.removeItem('currentUser');
  }


  /**
   * Login
   * @param username user->username
   * @param password user->password
   */
  public login(username: string, password: string): Observable<string> {
    return this.http.post<ResponseObject>(this.loginEndPoint, new RequestObject({ username, password }))
      .pipe(
        take(1),
        map((response) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // get the user
          const user: User = response.data as User;
          // save the user and store it in the local storage
          this.storeUser(user);
          return response.message;
        }));
  }


  /**
   * Register
   * @param requestUser the user that should be registered User{fullname, email, password, username}
   */
  public register(requestUser: User): Observable<string> {
    return this.http.post<ResponseObject>(this.registerEndPoint, new RequestObject(requestUser))
      .pipe(
        take(1),
        map((response) => {
          // in case of response error
          if (response.error) {
            return response.error;
          }
          // get the user
          const user: User = response.data as User;
          // save the user and store it in the local storage
          this.storeUser(user);
          return response.message;
        }));
  }


  /**
   * Logout
   */
  public logout() {
    this.removeUser();
  }

}
