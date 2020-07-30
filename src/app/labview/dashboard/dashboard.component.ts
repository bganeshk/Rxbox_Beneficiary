import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MetadataService } from 'src/app/global/metadata.service';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { HealthRec } from 'rx-lib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
 
  filteredCustomers:any[];
  customerId:string;
  selectedCustomerId:string;
  labRecs:HealthRec[];
  newLabRec:HealthRec;
  visibleDlg:boolean=false;
  otherOpts: SelectItemGroup[];
  labAttrib:string[];
  verifyPhoneOTP:boolean;
  phoneOTP:String;

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService){
    
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
    this.labRecs=[]; 
 
  }

  addNewData(){
    this.visibleDlg=true;
    this.labAttrib=[];
    this.newLabRec={attachments:null,desc:null,metadata:null,recIssuer:null,recType:null,rec_no:null,refNumber:null,dataValue:new Map(),recTypeDesc:null};
  }

  onEdit(e:HealthRec){
    this.visibleDlg=true;
    this.labAttrib=[];
    this.newLabRec=e;  
  }

  blDlgSave(){
    if( !this.newLabRec.rec_no){
      this.newLabRec.rec_no='dsaf';
      this.labRecs.push(this.newLabRec);
    }else{
    this.labRecs.forEach(e => {
      if(e.rec_no===this.newLabRec.rec_no){
        e=this.newLabRec;
      }
    });
  }
    this.visibleDlg=false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
  }


  blDlgCancel(){
    this.visibleDlg=false;
    this.labAttrib=[];
  }

  addAttrib(e){
    console.debug(e.value);
    this.newLabRec.dataValue.set(e.value,'');
  }


  selectCustomer(e){
    this.verifyPhoneOTP=true;
    this.messageService.clear('c');
    this.messageService.add({key: 'c',sticky:true,severity:'success', summary:'Verify OTP', detail:'OTP has been send to registered email and phone'});

    this.selectedCustomerId=e;
    this.mdataSrvs.getLabHealthRec().forEach(e =>{
      if("lab_report"==e.recType ){
        this.labRecs.push(e);
      }
    });
    this.newLabRec=this.labRecs[0]; 
  }


}
