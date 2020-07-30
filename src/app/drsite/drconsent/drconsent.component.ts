import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DrViewdataService } from 'src/app/global/dr-viewdata.service';
import { MessageService } from 'primeng/api';
import { MetadataService } from 'src/app/global/metadata.service';
import { ConsntReq } from 'rx-lib';

@Component({
  selector: 'app-drconsent',
  templateUrl: './drconsent.component.html',
  styleUrls: ['./drconsent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrconsentComponent implements OnInit {
  myConsents:ConsntReq[]
  selectedConsent:ConsntReq;

  visibleDlg:boolean;
  reffNo: string;
  constructor(private drViewSrvs: DrViewdataService,private mdataSrvs: MetadataService,
     private messageService: MessageService) { }

  ngOnInit(): void {
    this.myConsents=this.mdataSrvs.getConsReq(null,null);
  }

  @Input()
  public set reviewRef(reviewRef: string) {
    this.reffNo = reviewRef;
  }
  
  onEdit(req:ConsntReq){
    this.visibleDlg=true;
    this.selectedConsent=req;
  }
  onDelete(req:ConsntReq){
    this.selectedConsent=req;

  }
 
  reqNewConsent(){
    this.visibleDlg=true;
    this.selectedConsent={access_statrdt:null,access_type:null,beneficiary:{beId:null,beName:null},remarks:null,reqCreated_on:null,reqCreater:null,reqId:null,requstor_details:null,status:null,reqAccess_category:null};
  }

  onRowSelect(){
    
  }
  blDlgCancel(){
    this.visibleDlg=false;
  }
  blDlgSave(){
    this.visibleDlg=false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
  }
}
