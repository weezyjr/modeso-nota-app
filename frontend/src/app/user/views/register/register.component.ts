import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/auth/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private notifierService: NotifierService) { }

  // create user object
  public user: User = new User();

  async register(formIsValid: boolean) {
    // check if the form is valid
    if (formIsValid) {
      // login
      await this.authService.register(this.user)
        .subscribe((msg) => {
          this.notifierService.notify('success', msg);
          // TODO: Move to another page
        });
    }
  }

  ngOnInit() {}

}
