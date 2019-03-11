import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router) { }

  // create user object
  public user: User = new User();

  async register(event) {
    // get the user from the form
    this.user = event;
    console.log(this.user);
    // register
    if (this.user) {

      await this.authService.register(this.user)
        .subscribe((msg) => {
          this.notifierService.notify('success', msg);
          this.router.navigateByUrl('/dashboard');
        });
    }
  }

  ngOnInit() { }

}
