import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { MetadataService,  } from 'src/app/global/metadata.service';
import { Prescription, DashboardService, PrescriptionService } from 'rx-lib';

@Component({
  selector: 'app-presc-history',
  templateUrl: './presc-history.component.html',
  styleUrls: ['./presc-history.component.css']
})
export class PrescHistoryComponent implements OnInit {

  prescriptions:Prescription[];
  selectedPerscription:Prescription;
  
  constructor(private mdataSrvs: MetadataService, private prescSrvs:PrescriptionService) { }

  ngOnInit() {
    this.prescSrvs.getActivePrescription().then(res=>{
      this.prescriptions=res.medicine;
    })
  }

}
