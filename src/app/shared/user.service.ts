import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFireDatabase) { }
  userList: AngularFireList<any>;
  
  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
  });


  getUsers() {
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }

  insertUser(user) {
    this.userList = this.firebase.list('/users');
      if (user) {
        this.userList.push({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNo: user.mobileNo
      });
    }
    // this.userList.push({
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   mobileNo: user.mobileNo
    // });
  }

  updateUser(user) {
  this.userList.update(user.$key,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNo: user.mobileNo
    });
  }

  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
