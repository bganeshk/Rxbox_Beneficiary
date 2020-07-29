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
  selectedCustomerId:string;
  privateConsultation:boolean=true;
  appointments:any[];
  
  @Output() public onSelect = new EventEmitter();
  verifyPhoneOTP:boolean;
  phoneOTP:String;
  visibleDlg:boolean=false;
  showDlg:boolean;
  videoFlag: any;
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
    this.onSelect.emit(this.selectedCustomerId);
    this.messageService.add({severity:'error', summary:'OTP Verification', detail:'Invalid OTP, Please enter valid OTP'});
  }
  filterCustomer(e){
    this.selectedCustomerId=null;
    let query = e.query;
    this.filteredCustomers = [{name:query+'aaaaa',id:'custid-1'},{name:query+'aaab',id:'custid-2'}] ;
  }
  selectCutomer(e){
    this.verifyPhoneOTP=true;
    this.selectedCustomerId=e.id;
    this.onSelect.emit(this.selectedCustomerId);    
    this.messageService.clear('c');
    this.messageService.add({key: 'c',sticky:true,severity:'success', summary:'Verify OTP', detail:'OTP has been send to registered email and phone'});
  }

  selectAppointment(e){
    this.selectedCustomerId='1';
    this.onSelect.emit(this.selectedCustomerId);    
  }

  showChat(videoFlag){
    this.showDlg=true;
    this.videoFlag=videoFlag;
  }

  handleModeChange(e){
    if(this.privateConsultation){
      this.appointments=[];
    }else{
      this.appointments=[
        {tokenNum:"A-001",pname:'Pateint 1',age:43, refNum:'20012/12/124' },
        {tokenNum:"E-001",pname:'Pateint 2',age:3, refNum:'20012/12/124' },
        {tokenNum:"A-002",pname:'Pateint 3',age:73, refNum:'20012/12/124' },
        {tokenNum:"A-004",pname:'Pateint 4',age:33, refNum:'20012/12/124' },
        {tokenNum:"A-003",pname:'Pateint 5',age:23, refNum:'20012/12/124' },
      ];
    }
  }
}
