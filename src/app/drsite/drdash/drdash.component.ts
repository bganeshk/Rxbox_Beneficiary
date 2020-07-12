import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-drdash',
  templateUrl: './drdash.component.html',
  styleUrls: ['./drdash.component.css']
})
export class DrdashComponent implements OnInit {

  filteredCustomers:any[];
  customerId:string;
  selectedCustomerId:string;
  verifyPhoneOTP:boolean;
  phoneOTP:String;
  visibleDlg:boolean=false;



  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  
  cancelSearch(){
    this.verifyPhoneOTP=false;
    this.messageService.clear('c');
  }
  sendEmailOTP() {
    console.debug("send e OTP");
  }
  sendOTP(resend:boolean) {
    console.debug("send OTP");
    if(!resend){
      this.verifyPhoneOTP=!this.verifyPhoneOTP;
    }else{

      this.messageService.add({severity:'info', summary:'OTP Re-send', detail:'OTP has been re-send to registered email and phone'});
    }
  }
  verifyOTP() {

    console.debug("send OTP");
    this.verifyPhoneOTP=!this.verifyPhoneOTP;
    this.verifyPhoneOTP=true;
    //this.messageService.clear();
    this.messageService.add({severity:'error', summary:'OTP Verification', detail:'Invalid OTP, Please enter valid OTP'});
  }
  filterCustomer(e){
    let query = e.query;
    console.debug(query);
    this.selectedCustomerId=null;
    this.filteredCustomers = [{name:query+'aaaaa'},{name:query+'aaab'}] ;
  }
  selectCutomer(e){
    this.verifyPhoneOTP=true;
    this.messageService.clear('c');
    this.messageService.add({key: 'c',sticky:true,severity:'success', summary:'Verify OTP', detail:'OTP has been send to registered email and phone'});
  }
}
