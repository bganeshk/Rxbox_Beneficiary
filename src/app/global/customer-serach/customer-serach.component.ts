import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MetadataService } from '../metadata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-serach',
  templateUrl: './customer-serach.component.html',
  styleUrls: ['./customer-serach.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerSerachComponent {

  filteredCustomers:any[];
  customerId:string;
  
  @Output() public onSelect = new EventEmitter();
  verifyPhoneOTP:boolean;
  phoneOTP:String;
  visibleDlg:boolean=false;

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }


  
  cancelSearch(){
    this.verifyPhoneOTP=false;
    this.messageService.clear('c');
    
  }
  sendEmailOTP() {
    console.debug("send e OTP");
  }
  sendOTP(resend:boolean) {
   
    if(!resend){
      this.verifyPhoneOTP=!this.verifyPhoneOTP;
    }else{

      this.messageService.add({severity:'info', summary:'OTP Re-send', detail:'OTP has been re-send to registered email and phone'});
    }
  }
  verifyOTP() {
   this.verifyPhoneOTP=!this.verifyPhoneOTP;
    this.verifyPhoneOTP=true;
    this.onSelect.emit(this.customerId);
    this.messageService.add({severity:'error', summary:'OTP Verification', detail:'Invalid OTP, Please enter valid OTP'});
  }
  filterCustomer(e){
    let query = e.query;
    this.filteredCustomers = [{name:query+'aaaaa',id:'custid-1'},{name:query+'aaab',id:'custid-2'}] ;
  }
  selectCutomer(e){
    this.verifyPhoneOTP=true;
    this.customerId=e.id;
    this.onSelect.emit(this.customerId);    
    this.messageService.clear('c');
    this.messageService.add({key: 'c',sticky:true,severity:'success', summary:'Verify OTP', detail:'OTP has been send to registered email and phone'});
  }

}
