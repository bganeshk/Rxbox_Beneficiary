import { Component, OnInit } from '@angular/core';
import {  MetadataService,} from 'src/app/global/metadata.service';
import { MedFullFillment } from 'rx-lib';

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
