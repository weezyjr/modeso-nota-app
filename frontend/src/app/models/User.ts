import { Note } from './Note';

export class User {
  public id: string;
  public fullname: string;
  public email: string;
  public username: string;
  public password?: string;
  public jwt?: string;
  public notes?: Note[];

  /**
   *  USER
   * @param fullname set user full name
   * @param email set user email
   * @param username set user username
   * @param password set user password
   */
  constructor(fullname?: string, email?: string, username?: string, password?: string) {
    this.fullname = fullname;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
