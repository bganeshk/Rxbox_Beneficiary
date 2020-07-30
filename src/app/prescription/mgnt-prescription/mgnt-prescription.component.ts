import { Component, OnInit } from '@angular/core';
import { MetadataService,  } from 'src/app/global/metadata.service';
import { MessageService, SelectItem } from 'primeng/api';
import { DailyMed, Medicine, DailyMedClass } from 'rx-lib';



@Component({
  selector: 'app-mgnt-prescription',
  templateUrl: './mgnt-prescription.component.html',
  styleUrls: ['./mgnt-prescription.component.css']
})
export class MgntPrescriptionComponent implements OnInit {

  prescriptions: DailyMed[];
  selectedphr: DailyMed;
  constructor(private mdataSrvs: MetadataService) { }
  cols: any[]
  newphr: boolean;
  displayDlg: boolean;
  meds: Medicine[];
  freeqDrdw: SelectItem[];
  freeqDetdw: SelectItem[]
  isBenifeciary:boolean

  ngOnInit() {
    this.prescriptions = this.mdataSrvs.getDailyMed();

    this.cols = [
      { field: 'med.medname', header: 'Medicine' },
      { field: 'afterFood', header: 'After Food' },
      { field: 'medType', header: 'Medicine Type' },
      { field: 'morningQty', header: 'Morning Dose' },
      { field: 'afternoongQty', header: 'After Noon Dose' },
      { field: 'eveninggQty', header: 'After Noon Dose' },
      { field: 'medNotes', header: 'Remarks' },
    ];
    this.meds = this.mdataSrvs.getMedicines();
    this.freeqDrdw = [
      { label: 'Daily', value: 'D' },
      { label: 'Weekly', value: 'W' },
      { label: 'Monthly', value: 'M' },
    ];

  }


  onSelectfreeqDrdw() {
    this.freeqDetdw = this.getFreeqencyDetails();
  }
  getFreeqencyDetails(): SelectItem[] {

    switch (this.selectedphr.repeatCycle) {
      case 'D': {
        return [
          { label: 'EveryDay', value: 'ED' },
          { label: 'Every Other Day', value: 'EOD' },
          { label: 'Every 3rd Day', value: 'EOT' }
        ]
      }
      case 'W': {
        return [
          { label: 'Every Monday', value: 'EMO' },
          { label: 'Every Tuesday', value: 'ETU' },
          { label: 'Every Wednesday', value: 'EWE' },
          { label: 'Every Thursday', value: 'ETH' },
          { label: 'Every Friday', value: 'EFR' },
          { label: 'Every Saturday', value: 'ESA' },
          { label: 'Every Sunday', value: 'ESU' },
        ]
      }
      case 'M': {
        return [
          { label: 'First Day', value: 'FDM' },
          { label: '2nd week', value: 'W2' },
          { label: '3rd Week', value: 'W3' },
          { label: '4th Week', value: 'W4' },
          { label: 'Last Day of month', value: 'LDM' },
        ]
      }
    }
  }

  onRowSelect(e) {
    this.newphr = false;
    this.selectedphr = this.clonePres(e.data);
    this.displayDlg = true;
    if (!this.selectedphr.repeatCycle) {
      this.selectedphr.repeatCycle = 'D';
    }
    this.freeqDetdw = this.getFreeqencyDetails();
  }

  showDialogToAdd() {
    this.newphr = true;
    this.selectedphr = new DailyMedClass();
    this.displayDlg = true;
  }

  save() {
    let pres = [...this.prescriptions];

    if (this.newphr)
      pres.push(this.selectedphr);
    else {
      console.debug(this.prescriptions, this.selectedphr, this.prescriptions.indexOf(this.selectedphr));
      pres[this.prescriptions.indexOf(this.selectedphr)] = this.selectedphr;
    }
    this.prescriptions = pres;
    this.selectedphr = null;
    this.displayDlg = false;
  }

  delete() {
    let index = this.prescriptions.indexOf(this.selectedphr);
    this.prescriptions = this.prescriptions.filter((val, i) => i != index);
    this.selectedphr = null;
    this.displayDlg = false;
  }
  clonePres(c: DailyMed) {
    let pr: DailyMed = JSON.parse(JSON.stringify(c));
    return pr;
  }
}
