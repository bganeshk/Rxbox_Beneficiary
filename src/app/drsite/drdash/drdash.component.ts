import { Component, OnInit } from '@angular/core';
import { MetadataService, HealthRec, FmlyHealthRec, DailyMed } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-drdash',

  templateUrl: './drdash.component.html',
  styleUrls: ['./drdash.component.css']
})
export class DrdashComponent implements OnInit {

  customerId: string;
  items: MenuItem[];
  fmlyEHRs:FmlyHealthRec[];
  dms: DailyMed[];
  labRecs:HealthRec[];
  mnuItem:string;
  reviewRef:string;
  lsbar:boolean=true;
  rsbar:boolean=true;
  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home',command: (e) => {
        this.selectMenu(e);              
      } },      
      { label: 'Ehr', icon: 'pi pi-fw pi-file',command: (e) => {
        this.selectMenu(e);              
      } },
      { label: 'Notes', icon: 'pi pi-fw pi-pencil',command: (e) => {
        this.selectMenu(e);             
      } },
      { label: 'Consent', icon: 'pi pi-fw pi-calendar',command: (e) => {
        this.selectMenu(e);             
      } },
      { label: 'Appointment', icon: 'pi pi-fw pi-calendar-plus',command: (e) => {
        this.selectMenu(e);      
      } }
    ];
    
    this.fmlyEHRs=this.mdataSrvs.getFmlyHealthRec();
    this.dms = this.mdataSrvs.getDailyMed();
    this.labRecs=this.mdataSrvs.getLabHealthRec(); 
    this.mnuItem='Home';
  }

  selectMenu(e){
    this.mnuItem=e.item.label; 
    console.debug(this.reviewRef);
  }
  selectCutomer(e) {
    this.customerId = e;
    console.debug(this.customerId, e);
  }
  selectReview(e){
    this.reviewRef=e;
  }
}
