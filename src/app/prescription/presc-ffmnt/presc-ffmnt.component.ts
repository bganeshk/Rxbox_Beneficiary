import { Component, OnInit } from '@angular/core';
import { DailyMed, MetadataService, MedFullFillment } from 'src/app/global/metadata.service';

@Component({
  selector: 'app-presc-ffmnt',
  templateUrl: './presc-ffmnt.component.html',
  styleUrls: ['./presc-ffmnt.component.css']
})
export class PrescFfmntComponent implements OnInit {

  presff:any[]  
  wdmDis:string='D';//possible values are W/D/M
  selectedphr:MedFullFillment;
  mediFullFillments:MedFullFillment[];
  displayRefillDet:boolean;

  constructor(private mdataSrvs: MetadataService) { }

  ngOnInit() {

   this.mediFullFillments=this.mdataSrvs.getMedFullFillments();
  }
  onDisplayRefillDet(rowData)  {
   this.displayRefillDet=true;  
   this.selectedphr=rowData;
   console.debug(this.selectedphr);
  }


}
