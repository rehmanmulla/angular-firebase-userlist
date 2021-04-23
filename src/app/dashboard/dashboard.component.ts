import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userArray = [];
  deleteMsg: boolean;
  closeResult: string;
  updateMsg: boolean;
  notUpdated: boolean;
  submitted: boolean;
  formControls = this.userService.form.controls;

  constructor(
    public userService: UserService,
    private modalService: NgbModal
  ) { }

  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
  });
  
  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe( list => {
      this.userArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  onUpdate() {
    debugger;
    if (this.userService.form.valid) {      
      this.userService.updateUser(this.userService.form.value);
      this.getUserList();
      this.updateMsg = true;
      setTimeout(()=> this.updateMsg = false, 2000);
      this.userService.form.reset();
    } else {
      this.notUpdated = true;
      setTimeout(()=> this.notUpdated = false, 2000);
    }
  }
  

  onDelete($key) {
    if(confirm('Record Will Be Deleted!!! Are You Sure?')){
      this.userService.deleteUser($key);
      this.deleteMsg = true;
      setTimeout(()=> this.deleteMsg = false, 3000);
    }
  }

  open(content, user) {
    debugger;
    this.userService.form.setValue(user);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
