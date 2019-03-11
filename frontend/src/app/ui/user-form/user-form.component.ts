import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  // password is not required in update mode
  @Input() isUpdate = false;
  // current user
  @Input() user: User = new User();
  // output the submitted user
  @Output() submitUser: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitForm(isValid: boolean) {
    // check if the form is valid
    if (isValid) {
      this.submitUser.emit(this.user);
    }
  }

}
