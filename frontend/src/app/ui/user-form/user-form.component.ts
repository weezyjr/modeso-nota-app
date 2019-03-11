import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() user: User = new User();
  @Output() submitUser: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitForm(isValid: boolean) {
    if (isValid) {
      this.submitUser.emit(this.user);
    }
  }

}
