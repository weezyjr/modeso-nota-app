import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router) { }

  // create user object
  public user: User = new User();

  async login(formIsValid: boolean) {
    // check if the form is valid
    if (formIsValid) {
      // login
      await this.authService.login(this.user.username, this.user.password)
        .subscribe((msg) => {
          this.notifierService.notify('success', msg);
          this.router.navigateByUrl('/dashboard');
        });
    }
  }

  ngOnInit() { }

}
