import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private notifierService: NotifierService) { }

  // create user object
  public user: User = new User();

  async login(formIsValid: boolean) {
    // check if the form is valid
    if (formIsValid) {
      // login
      await this.authService.login(this.user.username, this.user.password)
        .subscribe((msg) => {
          this.notifierService.notify('success', msg);
          // TODO: Move to another page
        });
    }
  }

  ngOnInit() {}

}
