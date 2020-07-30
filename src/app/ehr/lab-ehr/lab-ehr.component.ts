import { Component, OnInit } from '@angular/core';
import { FmlyHealthRec, MetadataService, HealthRec } from 'src/app/global/metadata.service';
import { SelectItem, MessageService, SelectItemGroup } from 'primeng/api';
import { GlobalBeeService } from 'cmn-lib';

@Component({
  selector: 'app-lab-ehr',
  templateUrl: './lab-ehr.component.html',
  styleUrls: ['./lab-ehr.component.css']
})
export class LabEhrComponent implements OnInit {


  labRecs:HealthRec[];
  newLabRec:HealthRec;
  visibleDlg:boolean=false;
  otherOpts: SelectItemGroup[];
  isReadOnly: boolean;
  
  constructor(private mdataSrvs: MetadataService, 
    private messageService: MessageService,
    private beeSrvs:GlobalBeeService) { 
    
  }

  ngOnInit() {    
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
    this.labRecs=this.mdataSrvs.getLabHealthRec();
    this.newLabRec=this.labRecs[0];
    if('dash'===this.beeSrvs.getCurrentPage()){
      this.isReadOnly=true;
    }
  }

  onDelete(e){
    let recs=this.labRecs.splice(this.labRecs.indexOf(e.data),1);
    this.labRecs.push(recs[0]);
    this.labRecs.pop();
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Deleted', detail: 'Record has been deleted successfully' });
  }
  onEdit(e:HealthRec){
    this.visibleDlg=true;
    this.newLabRec=e;   
  }
  addNewData(){
    this.visibleDlg=true;
    this.newLabRec={attachments:null,desc:null,metadata:null,recIssuer:null,recType:null,rec_no:null,refNumber:null,dataValue:new Map(),recTypeDesc:null};
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
  }

}
