import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BeeAuthService } from 'cmn-lib';

@Component({
  selector: 'app-prfpasswd',
  templateUrl: './prfpasswd.component.html',
  styleUrls: ['./prfpasswd.component.css'],
  providers: [ MessageService,BeeAuthService],
})
export class PrfpasswdComponent implements OnInit {

  oldpwd:string;
  newpwd1:string
  newpwd2:string;
  userForm:FormGroup

  constructor( private msgSrvs: MessageService,private fb:FormBuilder,
    private bAuthSrvs:BeeAuthService) { }

  ngOnInit() {
    
    
    this.userForm=this.getUserForm();
  }
  getUserForm(): FormGroup {
    return this.fb.group({
     // "oldpwd":new FormControl('',Validators.required),
      "newpwd1":new FormControl('', Validators.compose([Validators.minLength(5)])),
      "newpwd2":new FormControl('', Validators.compose([Validators.minLength(5)])),
    });
  }


  onSubmit(value: string) {
    var data = JSON.parse(JSON.stringify(this.userForm.value));

    console.debug(data.newpwd1===data.newpwd2);
    if(''!=data.newpwd1 && data.newpwd1===data.newpwd2){
      this.bAuthSrvs.updatePwd(data.newpwd1)
      .then(res=>{
        this.msgSrvs.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
        this.userForm.reset();
      })
      .catch(err=>{
        this.msgSrvs.add({ severity: 'error', summary: 'Error', detail: 'Password change failed' });        
      });
      
      
    }else{
      this.msgSrvs.add({ severity: 'error', summary: 'Error', detail: 'Password not correct or not matching' });
       
    }
  }
}
