
import { Component, OnInit } from '@angular/core';
import { MetadataService, } from 'src/app/global/metadata.service';
import { SelectItemGroup, MenuItem } from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { ehr_bp, ehr_diabetic, ehr_tempoxypulse, HealthRec, EhrService } from 'rx-lib';
import { GlobalBeeService } from 'cmn-lib';

@Component({
  selector: 'app-mgnt-ehr',
  templateUrl: './mgnt-ehr.component.html',
  styleUrls: ['./mgnt-ehr.component.css'],
  providers: [EhrService]
})
export class MgntEhrComponent implements OnInit {

  bpData: ehr_bp[];
  diaData: ehr_diabetic[];
  tempoxyData: ehr_tempoxypulse[];
  otherEhrs: HealthRec[];
  newBpData: ehr_bp;
  vaccineEhrs: HealthRec[];
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
  beneficiaryRole: boolean;

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService,
    private beeSrvs: GlobalBeeService, private ehrSrvs: EhrService) {

  }

  ngOnInit() {

    this.beneficiaryRole = ((this.beeSrvs.getRoles()?.indexOf("dr_role") < 0) || (this.beeSrvs.getRoles()?.indexOf("lab_role") < 1));
    this.otherOpts = this.mdataSrvs.getEhrCategoryDetList();
      this.items = [
        { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.editData() },
        { label: 'Delete', icon: 'pi pi-times', command: (event) => this.blDlgDelete('') }
      ];
    
    this.ehrSrvs.getBPEhr().then(res => {
      this.bpData = res;
    });
    this.ehrSrvs.getDiabeticEhr().then(res => {
      this.diaData = res;
    });
    this.ehrSrvs.getTempoxyEhr().then(res => {
      this.tempoxyData = res;
    });
    this.otherEhrs = this.mdataSrvs.getCustSelectedRec();
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
        if (!this.beneficiaryRole) {
          this.addNewData('');
        }
      }
    }
  }

  onSelectOthrOpt(ev) {
    this.cols = [];
    this.ehrSrvs.getEhrsOfType("lab_ehr").then(res => {
      this.otherEhrs = res;
      this.otherEhrs.forEach(eh => {
        let dv = eh.dataValue;
        eh.dataValue = new Map<string, string>();
        for (var key in dv) {
          eh.dataValue.set(key, dv[key]);
          if (this.cols.indexOf(key) < 0) {
            this.cols.push(key);
          }
        }
      });
    });
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
    }else if(ty==='OE' && this.beneficiaryRole){
      return; 
    }
    //continue if it is not edit
    this.newBpData = null;
    this.newDiaData = null;
    this.newTempoxyData = null;


    switch (ty) {
      case 'BP': {

        this.newBpData = { ehrId: null, auditData: { createdBy: null, created_on: new Date(), version: 1 }, dias: 0, syst: 0 };
        break;
      }
      case 'BS': {
        this.newDiaData = { ehrId: null, auditData: { createdBy: null, created_on: new Date(), version: 1 }, af: 0, bf: 0 };
        break;
      }
      case 'TO': {
        this.newTempoxyData = { ehrId: null, auditData: { createdBy: null, created_on: new Date(), version: 1 }, pulsepersec: 0, oxireading: 0, temp: 0 };
        break;
      }
      case 'OE': {
        //only dr or lab can edit/delete data
        this.newOtherEhr = this.otherEhrs[0];
        this.newOtherEhr.dataValue = new Map();
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
    try {
      this.messageService.clear();
      switch (ty) {
        case 'BP': {
          if (this.newBpData.ehrId) {
            this.ehrSrvs.createBPEhr(this.newBpData).then(e => {
              this.newBpData.ehrId = e.ehrId;
              this.bpData.push(this.newBpData);
            });
          } else {
            this.ehrSrvs.updateBPEhr(this.newBpData).then(res => {
              this.newBpData = res;
            });
          }

          break;
        }
        case 'BS': {
          if (this.newDiaData.ehrId) {
            this.ehrSrvs.createDiabeticEhr(this.newDiaData).then(e => {
              this.newDiaData.ehrId = e.ehrId;
              this.diaData.push(this.newDiaData);
            });
          } else {
            this.ehrSrvs.updateDiabeticEhr(this.newDiaData).then(res => {
              this.newDiaData = res;
            });
          }

          break;
        }
        case 'TO': {
          if (this.newTempoxyData.ehrId) {
            this.ehrSrvs.createTempoxyEhr(this.newTempoxyData).then(e => {
              this.newTempoxyData.ehrId = e.ehrId;
              this.tempoxyData.push(this.newTempoxyData);
            });
          } else {
            this.ehrSrvs.updateTempoxyEhr(this.newTempoxyData).then(res => {
              this.newTempoxyData = res;
            });
          }

          break;
        }
        case 'OE': {
          if (this.newOtherEhr.rec_no) {
            this.ehrSrvs.createEhr(this.newOtherEhr).then(e => {
              this.newOtherEhr.rec_no = e.rec_no;
              this.otherEhrs.push(this.newOtherEhr);
            });
          } else {
            this.ehrSrvs.updateEhr(this.newOtherEhr).then(res => {
              this.newOtherEhr = res;
            });
          }

          break;
        }
      }
      this.messageService.add({ sticky: true, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
    } catch (error) {
      this.messageService.add({ sticky: true, severity: 'error', summary: 'Failed', detail: 'Operation failed' });
    }

  }

  blDlgDelete(ty: string) {
 
    
    this.bpDlg = false;
    if (ty == '') {
      ty = this.latestTblItm;
      console.debug(ty);
    }
    this.messageService.clear();
    try {

      switch (ty) {
        case 'BP': {
          this.ehrSrvs.deleteBPEhr(this.newBpData).then(res => {
            this.bpData.splice(this.bpData.indexOf(this.newBpData), 1);
            this.newBpData = null;
          });
          break;
        }
        case 'BS': {
          this.ehrSrvs.deleteDiabeticEhr(this.newDiaData).then(res => {
            this.diaData.splice(this.diaData.indexOf(this.newDiaData), 1);
            this.newDiaData = null;
          });
          break;
        }
        case 'TO': {
          this.ehrSrvs.deleteTempoxyEhr(this.newTempoxyData).then(res => {
            this.tempoxyData.splice(this.tempoxyData.indexOf(this.newTempoxyData), 1);
            this.newTempoxyData = null;
          });
          break;
        }
        case 'OE': {
          if(this.beneficiaryRole){
            return;
          }
          this.ehrSrvs.deleteEhr(this.newOtherEhr).then(res => {
            this.otherEhrs.splice(this.otherEhrs.indexOf(this.newOtherEhr), 1);
            this.newOtherEhr = null;
          });
          break;
        }
      }
      this.messageService.add({ sticky: true, severity: 'success', summary: 'Record delted', detail: 'Record has been deleted successfully' });

    } catch (error) {
      this.messageService.add({ sticky: true, severity: 'error', summary: 'Failed', detail: 'Operation Failed' });
    }


  }
}