import { Component, OnInit } from '@angular/core';
import { MetadataService, FmlyHealthRec } from 'src/app/global/metadata.service';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-fmly-ehr',
  templateUrl: './fmly-ehr.component.html',
  styleUrls: ['./fmly-ehr.component.css']
})
export class FmlyEhrComponent implements OnInit {

  fmlyRecs:FmlyHealthRec[];
  newFmlyRec:FmlyHealthRec;
  visibleDlg:boolean=false;
  relations:SelectItem[];
  otherOpts: SelectItemGroup[];

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { 
    
  }

  ngOnInit() {    
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
    this.fmlyRecs=this.mdataSrvs.getFmlyHealthRec();
    console.debug(this.fmlyRecs);
    this.newFmlyRec=this.fmlyRecs[0];
    this.relations=[
      {label:'Father',value:'Father'},
      {label:'Mother',value:'Mother'},
      {label:'Grand_Father',value:'Grand_Father'},
      {label:'Grand_Mother',value:'Grand_Mother'},
      {label:'Brother',value:'Brother'},
      {label:'Sister',value:'Sister'}
    ]
  }

  onDelete(e){
    let recs=this.fmlyRecs.splice(this.fmlyRecs.indexOf(e.data),1);
    this.fmlyRecs.push(recs[0]);
    this.fmlyRecs.pop();
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Deleted', detail: 'Record has been deleted successfully' });
  }
  onEdit(e:FmlyHealthRec){
    this.visibleDlg=true;
    this.newFmlyRec=e;   
  }
  addNewData(){
    this.visibleDlg=true;
    this.newFmlyRec={data:{attachments:null,desc:null,metadata:null,recIssuer:null,recType:null,rec_no:null,refNumber:null,dataValue:new Map(),recTypeDesc:null},realtions:[]};
  }

  blDlgSave(){
    if(!this.newFmlyRec.data || !this.newFmlyRec.data.rec_no){
      this.newFmlyRec.data.rec_no='dsaf';
      this.fmlyRecs.push(this.newFmlyRec);
    }else{
    this.fmlyRecs.forEach(e => {
      if(e.data.rec_no===this.newFmlyRec.data.rec_no){
        e=this.newFmlyRec;
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
