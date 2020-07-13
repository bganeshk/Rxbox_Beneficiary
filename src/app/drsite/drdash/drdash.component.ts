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

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Consents', icon: 'pi pi-fw pi-calendar' },      
      { label: 'Ehrs', icon: 'pi pi-fw pi-file' },
      { label: 'Notes', icon: 'pi pi-fw pi-pencil' },
      { label: 'Appointments', icon: 'pi pi-fw pi-calendar-plus' }
    ];
    this.fmlyEHRs=this.mdataSrvs.getFmlyHealthRec();
    this.dms = this.mdataSrvs.getDailyMed();
    this.labRecs=this.mdataSrvs.getLabHealthRec(); 
  }

  selectCutomer(e) {
    this.customerId = e;
    console.debug(this.customerId, e);
  }

}
