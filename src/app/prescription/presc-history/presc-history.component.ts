import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { MetadataService, Prescription } from 'src/app/global/metadata.service';

@Component({
  selector: 'app-presc-history',
  templateUrl: './presc-history.component.html',
  styleUrls: ['./presc-history.component.css']
})
export class PrescHistoryComponent implements OnInit {

  prescriptions:Prescription[];
  selectedPerscription:Prescription;
  
  constructor(private mdataSrvs: MetadataService) { }

  ngOnInit() {
    this.prescriptions=this.mdataSrvs.getPrescription();
  }

}
