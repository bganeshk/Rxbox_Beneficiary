import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [MessageService]
})
export class UserRegistrationComponent implements OnInit {

  loginEmailAddress: string;
  loginphone: string;
  userForm: FormGroup;
  loginpwd: string;
  confirmOTP: string;
  displayQrc: boolean = false;
  qrValue: string;
  msgs: Message[] = [];

  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  constructor(private msgSrvs: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.getUserForm();

  }

  getQrValue(): string {
    var formval = JSON.parse(JSON.stringify(this.userForm.value));
    return JSON.stringify({
      name: formval.loginphone,
      pwd: formval.loginpwd
    });
  }
  getUserForm(): FormGroup {
    return this.fb.group({
      "loginphone": new FormControl('', Validators.required),
      "loginEmailAddress": new FormControl('', Validators.nullValidator),
      "loginpwd": new FormControl('', Validators.required),
    });
  }
  onSubmit(value: string) {
    this.msgs.splice(0, this.msgs.length);
    if (this.userForm.valid) {     
      this.qrValue = this.getQrValue();
      this.displayQrc = true;
    } else {      
      this.msgs.push({ severity: 'info', detail: 'Valid Phone and Password is required' });
      return false;
    }
  }
  resendOTP() {
    throw new Error("method not implemented");
  }
  submitRegister() {
    this.msgs.splice(0, this.msgs.length);
    if (this.confirmOTP == null) {     
      this.msgs.push({ severity: 'info', detail: 'Please enter OTP' });
      return false;
    } else {
      throw new Error("method not implemented");
    }
  }

  backtoLogin(){
    this.displayQrc = false;
    this.msgs.splice(0,this.msgs.length);
    this.userForm.reset();
  }
}
