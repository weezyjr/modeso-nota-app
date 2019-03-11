import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService) { }

  // create user object
  public user: User;

  async update(event) {
    // get the user from the form
    this.user = event;
    // update
    if (this.user) {

      await this.authService.updateUser(this.user)
        .subscribe((msg) => {
          this.notifierService.notify('success', msg);
        });
    }
  }

  // delete user account
  async delete() {
    await this.authService.deleteUser()
      .subscribe((msg) => {
        this.notifierService.notify('success', msg);
      });
  }

  ngOnInit() {
    // get update current user value
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
