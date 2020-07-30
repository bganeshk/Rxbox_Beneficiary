import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { GlobalBeeService, BeeAuthService } from 'cmn-lib';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
  providers: [MessageService , GlobalBeeService, BeeAuthService]
})
export class UserloginComponent implements OnInit {

  rememberMe: boolean = false;
  loginEmailAddress: string;
  loginpwd: string;
  userForm: FormGroup;
  msgs: Message[] = [];
  forgetPwd: boolean;
  qrValue: string = "test string";
  confirmOTP: string;
  userpwdforgotForm: FormGroup;

 
  constructor(private router: Router, private msgSrvs: MessageService,
    private grsv: GlobalBeeService,
    private ulSrvc: BeeAuthService, private fb: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.getUserForm();
    this.userpwdforgotForm = this.getPwdforgetForm();
  }

  getUserForm(): FormGroup {
    return this.fb.group({
      "loginpwd": new FormControl('', Validators.required),
      "loginEmailAddress": new FormControl('', Validators.required),
      "rememberMe": new FormControl('', Validators.nullValidator),
    });
  }

  getPwdforgetForm(): FormGroup {
    return this.fb.group({
      "loginEmailAddress": new FormControl('', Validators.required)
    });
  }



  onSubmit(value: string) {
    this.msgs.splice(0, this.msgs.length);
    if (this.userForm.valid) {
      var data = JSON.parse(JSON.stringify(this.userForm.value));
      this.ulSrvc.login(data.loginEmailAddress, data.loginpwd);
      this.router.navigate(["/pages/dashboard"]);
      throw Error("mehtod not impletemented");
    } else {
      this.grsv.logout();
      this.msgs.push({ severity: 'info', detail: 'Valid Phone/Email and password is required' });
      return false;
    }

  }
  resendOTP() {
    throw Error("mehtod not impletemented");
  }
  forgetPwdMeth() {
    this.msgs.splice(0, this.msgs.length);
    this.forgetPwd = true;

  }

  backtoLogin(){
    this.forgetPwd=!this.forgetPwd;
    this.msgs.splice(0,this.msgs.length);
    this.userpwdforgotForm.reset();
  }
  resetPwd() {
    this.msgs.splice(0, this.msgs.length);
    if(!this.userpwdforgotForm.valid){
      this.msgs.push({ severity: 'info', detail: 'Please enter Phone number' });
      return false;
    }else  if (this.confirmOTP == null) {
      this.msgs.push({ severity: 'info', detail: 'Please enter OTP or Scan QRC' });
      return false;
    } else {
      this.router.navigate(["/profile/prfpasswd"]);
      throw Error("mehtod not impletemented");
    }
  }
}
