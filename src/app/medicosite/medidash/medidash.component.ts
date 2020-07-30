import { Component, OnInit } from '@angular/core';
import {  MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
import { MedFullFillment } from 'rx-lib';

@Component({
  selector: 'app-medidash',
  templateUrl: './medidash.component.html',
  styleUrls: ['./medidash.component.css']
})
export class MedidashComponent implements OnInit {


  selectedCustomerId: string;
  selectedphr: MedFullFillment;
  mediFullFillments: MedFullFillment[];
  displayRefillDet: boolean;


  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {

  }
  selectCustomer(e) {
    console.debug(e);
    this.selectedCustomerId = e;
    this.mediFullFillments = this.mdataSrvs.getMedFullFillments();
  }
  onDisplayRefillDet(rowData) {
    this.displayRefillDet = true;
    this.selectedphr = rowData;
    console.debug(this.selectedphr);
  }
  updatePurchase(e) {
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Purchase has been updated successfully' });
  }


}
