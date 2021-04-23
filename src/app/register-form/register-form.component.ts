import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService) { }
    submitted: boolean;
    successMsg: boolean;
    formControls = this.userService.form.controls;

  ngOnInit(): void {
  }

  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.userService.form.valid) {
      if (this.userService.form.get('$key').value == null) {
        this.userService.insertUser(this.userService.form.value);
      } else {
        this.userService.updateUser(this.userService.form.value);
      }
      this.successMsg = true;
      setTimeout(() => { 
        this.successMsg = false,
        this.router.navigate(['/dashboard']);
      }, 2000);
      this.submitted = false;
      this.userService.form.reset();
      
    }
  }

  

}
