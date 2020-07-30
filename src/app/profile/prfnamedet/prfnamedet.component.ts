import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Profiledet, ProfileAdd } from 'cmn-lib';
import { ProfileService } from 'cmn-lib';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prfnamedet',
  templateUrl: './prfnamedet.component.html',
  styleUrls: ['./prfnamedet.component.css'],
  providers: [ProfileService, MessageService],
})
export class PrfnamedetComponent implements OnInit {

  items1: MenuItem[];
  primaryAdd: Profiledet;
  savemode: boolean = true;
  prfolieStatus: boolean;
  userForm: FormGroup;
  verifyPhoneOTP:boolean;
  phoneOTP:String;

  constructor(private srvs: ProfileService, private msgSrvs: MessageService, private fb: FormBuilder) {
    this.primaryAdd = new Profiledet();
    this.primaryAdd.address = new ProfileAdd();
  }
  ngOnInit() {    
   
    this.srvs.getPrimaryAddress().then(res => this.primaryAdd = res)
      .catch((err) => {
        this.primaryAdd = new Profiledet();
        this.primaryAdd.address = new ProfileAdd();
      });
    this.userForm = this.getUserform();

  }
  sendEmailOTP() {
    console.debug("send e OTP");
  }
  sendOTP(resend:boolean) {
    console.debug("send OTP");
    if(!resend){
      this.verifyPhoneOTP=!this.verifyPhoneOTP;
    }
  }
  verifyOTP() {
    console.debug("send OTP");
    this.verifyPhoneOTP=!this.verifyPhoneOTP;
  }
  getUserform() {
    return this.fb.group({
      "fname": new FormControl('', Validators.minLength(3)),
      "mname": new FormControl('', Validators.nullValidator),
      "lname": new FormControl('', Validators.minLength(3)),
      "primemobile": new FormControl('', Validators.required),
      "primeEmail": new FormControl('', Validators.compose([Validators.required,Validators.email])),
      "savemode": new FormControl('', Validators.nullValidator),
      "phoneOTP": new FormControl('', Validators.nullValidator)
    });
  }
  onSubmit(value: string) {    
    if (this.userForm.valid) {
      var data = JSON.parse(JSON.stringify(this.userForm.value));
      let pdet:Profiledet=new Profiledet();      
      pdet.fname=data.fname;
      pdet.mname=data.mname;
      pdet.lname=data.lname;
      pdet.address=new ProfileAdd();
      pdet.address.primeEmail=data.primeEmail;
      pdet.address.primemobile=data.primemobile;
      console.debug("Call changeprimar det");
      this.srvs.changePrimaryDet(pdet) 
      .then(res=>{
        this.savemode = !this.savemode;
        this.primaryAdd =res;        
        this.msgSrvs.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });    
      }).catch(err=>{
        this.msgSrvs.add({ severity: 'error', summary: 'Failed', detail: 'Data Submitted failed' });    
      })         
    }
  }
}
