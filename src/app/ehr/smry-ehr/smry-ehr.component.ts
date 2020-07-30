import { Component, OnInit, Input } from '@angular/core';
import { MetadataService,} from 'src/app/global/metadata.service';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { SummaryHealthRec, DailyMed, HealthRec, RxNote } from 'rx-lib';

@Component({
  selector: 'app-smry-ehr',
  templateUrl: './smry-ehr.component.html',
  styleUrls: ['./smry-ehr.component.css']
})
export class SmryEhrComponent implements OnInit {
  summryRecs:SummaryHealthRec[];
  newsmryRec:SummaryHealthRec;
  showDlg:boolean=false;
  visibleCnt:number=3;
  otherOpts: SelectItemGroup[];
  smryDailyMed:DailyMed[];
  smryLabRpt:HealthRec[];
  rxnotes:RxNote[];


  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit() {    
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
    this.summryRecs=this.mdataSrvs.getSummaryHealthRec();
    this.rxnotes=this.mdataSrvs.getRxNote();
  }

@Input() public set visibleCount(cnt:number){
  this.visibleCnt=cnt;
}
  onDelete(rec){
    let recs=this.summryRecs.splice(this.summryRecs.indexOf(rec),1);
    this.summryRecs.push(recs[0]);
    this.summryRecs.pop();
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Deleted', detail: 'Record has been deleted successfully' });
  }
  onEdit(e:SummaryHealthRec){
    this.showDlg=true;
    this.newsmryRec=e;  
    console.debug(e.attachments); 
  }
  addNewData(){
    this.showDlg=true;
    
  }

  blDlgSave(){
    if( !this.newsmryRec.rec_no){
      this.newsmryRec.rec_no='dsaf';
      this.summryRecs.push(this.newsmryRec);
    }else{
    this.summryRecs.forEach(e => {
      if(e.rec_no===this.newsmryRec.rec_no){
        e=this.newsmryRec;
      }
    });
  }
    this.showDlg=false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
  }

  blDlgCancel(e){
    this.showDlg=false;
  }
  onTabClose(event){
    switch(event.index){
      case 0:{
      }case 1:{

      }case 2:{

      }
    }  
  }
  onTabOpen(event){
    switch(event.index){
      case 0:{
        this.smryDailyMed=this.mdataSrvs.getDailyMed();
      }case 1:{
        this.smryLabRpt=this.mdataSrvs.getLabHealthRec();
      }case 2:{

      }
    }
  } 

}
