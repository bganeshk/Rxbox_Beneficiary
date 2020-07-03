import { Component, OnInit } from '@angular/core';
import { MetadataService, ehr_bp, ehr_diabetic, ehr_tempoxypulse, HealthRec } from 'src/app/global/metadata.service';
import { SelectItemGroup, MenuItem } from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mgnt-ehr',
  templateUrl: './mgnt-ehr.component.html',
  styleUrls: ['./mgnt-ehr.component.css']
})
export class MgntEhrComponent implements OnInit {

  bpData: ehr_bp[];
  diaData: ehr_diabetic[];
  tempoxyData: ehr_tempoxypulse[];
  otherEhrs: HealthRec[];
  newBpData: ehr_bp;
  newDiaData: ehr_diabetic;
  newTempoxyData: ehr_tempoxypulse;
  newOtherEhr: HealthRec;
  bpDlg: boolean;
  latestTblItm: string;

  rowsize = 5;
  bpfirst = 0;
  diafirst = 0;
  toxyfirst = 0;
  oefirst = 0;

  otherOpts: SelectItemGroup[];
  selectedOpts: string;
  cols: any[];
  items: MenuItem[];

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
    this.items = [
      { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.editData() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.blDlgDelete('') }
    ];
    this.bpData = [
      { ehrId: '1', syst: 90.9, dias: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '2', syst: 90.9, dias: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '3', syst: 90.9, dias: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } }
    ];
    this.diaData = [
      { ehrId: '1', af: 90.9, bf: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '2', af: 90.9, bf: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '3', af: 90.9, bf: 83.3, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } }
    ];
    this.tempoxyData = [
      { ehrId: '1', temp: 90.9, oxireading: 83.3, pulsepersec: 80, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '2', temp: 90.9, oxireading: 83.3, pulsepersec: 80, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } },
      { ehrId: '3', temp: 90.9, oxireading: 83.3, pulsepersec: 80, auditData: { createdBy: 'GK', created_on: new Date(), version: 1 } }
    ];
    this.otherEhrs=this.mdataSrvs.getCustSelectedRec();
  }

  editData() {
    switch (this.latestTblItm) {
      case 'BP': {
        this.addNewData('');
      } case 'BS': {
        this.addNewData('');
      } case 'TO': {
        this.addNewData('');
      } case 'OE': {
        this.addNewData('');
      }
    }
  }

  onSelectOthrOpt() {
    this.otherEhrs = this.mdataSrvs.getCustSelectedRec();
    this.otherEhrs.forEach(e => {
    if(!e){
      e.dataValue=new Map();
    }
    e.dataValue.set('attr1', this.selectedOpts + 'value1');
    e.dataValue.set('attr2', this.selectedOpts + 'value2');
    e.dataValue.set('attr3', this.selectedOpts + 'value3');
  });
  this.cols = Array.from(this.otherEhrs[0].dataValue.keys());
  }

  next(type: string) {
    switch (type) {
      case 'BP': {
        this.bpfirst = this.bpfirst + this.rowsize;
        break;
      }
      case 'BS': {
        this.diafirst = this.diafirst + this.rowsize;
        break;
      }
      case 'TO': {
        this.toxyfirst = this.toxyfirst + this.rowsize;
        break;
      }
      case 'OE': {
        this.oefirst = this.oefirst + this.rowsize;
        break;
      }
    }

  }

  prev(type: string) {
    switch (type) {
      case 'BP': {
        this.bpfirst = this.bpfirst - this.rowsize;
        break;
      }
      case 'BS': {
        this.diafirst = this.diafirst - this.rowsize;
        break;
      }
      case 'TO': {
        this.toxyfirst = this.toxyfirst - this.rowsize;
        break;
      }
      case 'OE': {
        this.oefirst = this.oefirst - this.rowsize;
        break;
      }
    }
  }

  reset(type: string) {
    switch (type) {
      case 'BP': {
        this.bpfirst = 0;
        break;
      }
      case 'BS': {
        this.diafirst = 0;
        break;
      }
      case 'TO': {
        this.toxyfirst = 0;
        break;
      }
      case 'OE': {
        this.oefirst = 0;
        break;
      }
    }
  }

  isLastPage(type: string): boolean {
    switch (type) {
      case 'BP': {
        if (this.bpData) {
          return this.bpfirst === (this.bpData.length - 10);
        } else {
          return true;
        }
      }
      case 'BS': {
        if (this.diaData) {
          return this.diafirst === (this.diaData.length - 10);
        } else {
          return true;
        }
      }
      case 'TO': {
        if (this.tempoxyData) {
          return this.toxyfirst === (this.tempoxyData.length - this.rowsize);
        } else {
          return true;
        }
      }
      case 'OE': {
        console.debug("this.selectedOpts", this.selectedOpts);
        if (this.otherEhrs) {
          return this.oefirst === (this.otherEhrs.length - this.rowsize);
        } else {
          return true;
        }
      }
    }

  }

  isFirstPage(type: string): boolean {
    switch (type) {
      case 'BP': {
        return this.bpfirst === 0;
      } case 'BS': {
        return this.diafirst === 0;
      } case 'TO': {
        return this.toxyfirst === 0;
      } case 'OE': {
        return this.oefirst === 0;
      }
    }
  }

  addNewData(ty: string) {
    this.bpDlg = true;

    if (ty == '') {
      return;
    }
    this.newBpData = null;
    this.newDiaData = null;
    this.newTempoxyData = null;


    switch (ty) {
      case 'BP': {

        this.newBpData = { ehrId: '', auditData: { createdBy: 'GK', created_on: new Date(), version: 1 }, dias: 0, syst: 0 };
        break;
      }
      case 'BS': {
        this.newDiaData = { ehrId: '', auditData: { createdBy: 'GK', created_on: new Date(), version: 1 }, af: 0, bf: 0 };
        break;
      }
      case 'TO': {
        this.newTempoxyData = { ehrId: '', auditData: { createdBy: 'GK', created_on: new Date(), version: 1 }, pulsepersec: 0, oxireading: 0, temp: 0 };
        break;
      }
      case 'OE': {
        this.newOtherEhr=this.otherEhrs[0];
        this.newOtherEhr.dataValue =  new Map();
        this.cols.forEach(e => {
          this.newOtherEhr.dataValue.set(e, '');
        });        
        break;
      }
    }
  }

  blDlgCancel(ty: string) {
    this.bpDlg = false;
    this.newBpData = null;
    this.newDiaData = null;
    this.newOtherEhr = null;
    this.newTempoxyData = null;
  }

  blDlgSave(ty: string) {
    this.bpDlg = false;
    switch (ty) {
      case 'BP': {
        this.newBpData.ehrId = 'dfdsa';
        this.bpData.push(this.newBpData);
        break;
      }
      case 'BS': {
        this.newDiaData.ehrId = 'dfdsa';
        this.diaData.push(this.newDiaData);
        break;
      }
      case 'TO': {
        this.newTempoxyData.ehrId = 'dfdsa';
        this.tempoxyData.push(this.newTempoxyData);
        break;
      }
      case 'OE': {
        this.newOtherEhr.rec_no = 'dfdsa';
        this.otherEhrs.push(this.newOtherEhr);
        break;
      }
    }this.messageService.clear();
        this.messageService.add({ sticky: true, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });

    
  }

  blDlgDelete(ty: string) {
    this.bpDlg = false;
    if (ty == '') {
      ty = this.latestTblItm;
      console.debug(ty);
    }
    switch (ty) {
      case 'BP': {
        this.bpData.splice(this.bpData.indexOf(this.newBpData), 1);
        this.newBpData = null;
        break;
      }
      case 'BS': {
        this.diaData.splice(this.diaData.indexOf(this.newDiaData), 1);
        this.newDiaData = null;
        break;
      }
      case 'TO': {
        this.tempoxyData.splice(this.tempoxyData.indexOf(this.newTempoxyData), 1);
        this.newTempoxyData = null;
        break;
      }
      case 'OE': {
        this.otherEhrs.splice(this.otherEhrs.indexOf(this.newOtherEhr), 1);
        this.newBpData = null;
        break;
      }
    }
    this.messageService.clear();
    this.messageService.add({ sticky: true, severity: 'success', summary: 'Record delted', detail: 'Record has been deleted successfully' });

  }
}