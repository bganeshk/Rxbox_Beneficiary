import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MetadataService, Consnt } from 'src/app/global/metadata.service';
import {MessageService} from 'primeng/api';





@Component({
  selector: 'app-mgnt-consent',
  templateUrl: './mgnt-consent.component.html',
  styleUrls: ['./mgnt-consent.component.css']
})
export class MgntConsentComponent implements OnInit {
  cosnt_type:SelectItem[];
  cosnt_cat_type:SelectItem[];
  valididty_unty:SelectItem[];
  search_dtrange:Date[]
  cosnt_name:string;
  cosnt_tag:string[];
  cosnts: Consnt[];
  selectedCons:Consnt;
  cols: any[];
  displayDialog: boolean;
  displayEditDialog: boolean;


  constructor(private mdataSrvs:MetadataService,private messageService: MessageService) { }

  ngOnInit() {
    this.cosnt_type=this.mdataSrvs.getConsentTypeList();
    this.cosnt_cat_type=this.mdataSrvs.getEhrCategoryList(); 
    this.valididty_unty=this.mdataSrvs.getConsentValidityUnit();
    this.getConsents();  
  }
    selectConsent(event: Event, cn: Consnt) {
      this.selectedCons = cn;
      this.displayDialog = true;
      event.preventDefault();
  }

  editSelectConsent(event: Event, cn: Consnt) {
    this.selectedCons = cn;
    this.displayEditDialog = true;
    this.displayDialog = false;
    event.preventDefault();
   }

  onDialogHide() {
    this.selectedCons = null;
}

revokeConsent(){
  this.messageService.add({ sticky: false, severity: 'error', summary: 'Revocation failed', detail: 'Consent revocation cannot done at this moment' });
}
    getConsents(){
      this.cosnts=[
        {cons_id:'id1',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
        {cons_id:'id2',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:['Summary Report','Lab Report'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
      ];
    }
}

/**********************************************
*
*  This class is for assignment of consnet to a doctor or care provider by
* benificiary
************************************************************/

@Component({
  selector: 'app-mgnt-consent',
  templateUrl: './assign-consent.component.html',
  styleUrls: ['./mgnt-consent.component.css']
})
export class AssignConsentComponent implements OnInit{
  cosnt_type:SelectItem[];
  cosnt_cat_type:SelectItem[];
  valididty_unty:SelectItem[];
  newConst:Consnt;
  filteredAssigneeMultiple:any[];
  cosnt_tag:string[];
  filteredTemplate:any;
  verifyPhoneOTP:boolean;
  phoneOTP:String;

  constructor(private mdataSrvs:MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cosnt_type=this.mdataSrvs.getConsentTypeList();
    this.cosnt_cat_type=this.mdataSrvs.getEhrCategoryList(); 
    this.valididty_unty=this.mdataSrvs.getConsentValidityUnit();
   this.newConst={cons_id:null,cosnt_name:null,cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true};
  }
  
  filterTemplate(event){
    let query = event.query;
    console.debug(query);
    this.filteredTemplate = [{name:query+'aaaaa'},{name:query+'aaab'}] ;
  }

  filterAssigneMultiple(event){
    let query = event.query;
    console.debug(query);
    this.filteredAssigneeMultiple = [{name:query+'aaaaa'},{name:query+'aaab'}] ;
  }
  saveAssignment(event){
    this.verifyPhoneOTP=true;
    this.messageService.clear();
    this.messageService.add({key: 'c',sticky:true,severity:'success', summary:'Verify OTP', detail:'OTP has been send to registered email and phone'});
  }
  cancelAssing(){
    this.newConst=this.newConst={cons_id:null,cosnt_name:null,cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:null,created:null,validity:null,validity_unit:null,is_active:true};;
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

}