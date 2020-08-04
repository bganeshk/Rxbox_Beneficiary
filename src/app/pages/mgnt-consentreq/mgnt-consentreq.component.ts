import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import {  MetadataService } from 'src/app/global/metadata.service';
import { ConsntReq, ConsentService, Beneficiary } from 'rx-lib';
import { ProfileAdd } from 'cmn-lib';

 class ConsntReqObj implements ConsntReq{
  reqId: string;
  reqCreated_on: Date;
  reqCreater: string;
  beneficiary: Beneficiary;
  access_statrdt: Date;
  status: string;
  reqAccess_category?: string[];
  access_type: string;
  remarks: string;
  requstor_details: ProfileAdd;
  
}

@Component({
  selector: 'app-mgnt-consentreq',
  templateUrl: './mgnt-consentreq.component.html',
  styleUrls: ['./mgnt-consentreq.component.css']
})
export class MgntConsentreqComponent implements OnInit {
consentReqStatus:string;
conReq:ConsntReq[];
pendingReq:ConsntReq[];
expiredReq:ConsntReq[];


displayDialog:boolean;
selectedCons:ConsntReq;

  constructor(private messageService: MessageService,
    private consSrvs:ConsentService,
    private route:ActivatedRoute,) { }

  ngOnInit() {
    this.consentReqStatus=this.route.snapshot.data['status'];
    let cr=new ConsntReqObj();
    cr.status=this.consentReqStatus;
    console.debug(cr.status);
    this.consSrvs.getConsetnReqs(cr).then(res=>{      
      this.conReq=res;
    })
  }

  approve(cr:ConsntReq){
    this.consSrvs.approveConsentReq(cr).then(res=>{
      this.messageService.add({severity:'success', summary:'Request Approved', detail:'Consent request has been approved and send notificaiton to '+cr.reqCreater});
      this.displayDialog=false;
      this.selectedCons=null;
    })
    .catch(err=>{
      this.messageService.add({severity:'success', summary:'Failed', detail:'Request approve has been failed'});
    })   
  }

  rejectReq(cr:ConsntReq){
    
    this.consSrvs.rejectConsentReq(cr).then(res=>{
      this.messageService.add({severity:'success', summary:'Request Reject', detail:'Consent request has been Rejected'});
      this.displayDialog=false;
      this.selectedCons=null;
    })
    .catch(err=>{
      this.messageService.add({severity:'success', summary:'Failed', detail:'Reject request has been failed'});
    }) ;     
  }

  showDetails(conr:ConsntReq){
    this.displayDialog=true;
    this.selectedCons=conr;
  }

  handleChange(e) {
    var tabindex = e.index;
    let cr=new ConsntReqObj();
   
    if(tabindex==0){
      cr.status='new';
    }else if(tabindex==1){
      cr.status='pending';
    }else if(tabindex==2){
      cr.status='expired';
    }    
    this.consSrvs.getConsetnReqs(cr).then(res=>{      
      this.conReq=res;
    })
  }

  onDialogHide(e) {
    this.selectedCons = null;
} 
}
