import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import {  MetadataService } from 'src/app/global/metadata.service';
import { ConsntReq } from 'rx-lib';

@Component({
  selector: 'app-mgnt-consentreq',
  templateUrl: './mgnt-consentreq.component.html',
  styleUrls: ['./mgnt-consentreq.component.css']
})
export class MgntConsentreqComponent implements OnInit {
consentReqStatus:string;
conReq:ConsntReq[];
displayDialog:boolean;
selectedCons:ConsntReq;

  constructor(private messageService: MessageService,
    private mdataSrvs:MetadataService,
    private route:ActivatedRoute,) { }

  ngOnInit() {
    this.consentReqStatus=this.route.snapshot.data['status'];
    console.debug(this.consentReqStatus);
    this.conReq=this.mdataSrvs.getConsReq('new');
  }

  approve(conr:ConsntReq){
    this.messageService.add({severity:'success', summary:'Request Approved', detail:'Consent request has been approved and send notificaiton to '+conr.reqCreater});
    this.displayDialog=false;
    this.selectedCons=null;
  }

  rejectReq(conr:ConsntReq){
    this.messageService.add({severity:'info', summary:'Request Rjected', detail:'Consent request has been rejected'});
    this.displayDialog=false;
    this.selectedCons=null;
  }

  showDetails(conr:ConsntReq){
    this.displayDialog=true;
    this.selectedCons=conr;
  }

  handleChange(e) {
    var tabindex = e.index;
  }

  onDialogHide(e) {
    this.selectedCons = null;
} 
}
