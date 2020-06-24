import { Component, OnInit } from '@angular/core';
import { MetadataService, DailyMed, Medicine, DailyMedClass } from 'src/app/global/metadata.service';
import { MessageService, SelectItem } from 'primeng/api';



@Component({
  selector: 'app-mgnt-prescription',
  templateUrl: './mgnt-prescription.component.html',
  styleUrls: ['./mgnt-prescription.component.css']
})
export class MgntPrescriptionComponent implements OnInit {

  prescriptions:DailyMed[];
  selectedphr:DailyMed;
  constructor(private mdataSrvs:MetadataService) { }
  cols:any[]
  newphr:boolean;
  displayDlg:boolean;
  meds:Medicine[];

  ngOnInit() {
    this.prescriptions=this.mdataSrvs.getDailyMed();
    this.cols = [
      { field: 'med.medname', header: 'Medicien' },
      { field: 'afterFood', header: 'After Food' },
      { field: 'medType', header: 'Medicine Type' },      
      { field: 'morningQty', header: 'Morning Qty' },
      { field: 'afternoongQty', header: 'After Noon Qty' },
      { field: 'eveninggQty', header: 'After Noon Qty' },
      { field: 'medNotes', header: 'Remarks' },
      
  ];
    this.meds= this.mdataSrvs.getMedicines();
    
  }

  onRowSelect(e)  {
    this.newphr=false;
    this.selectedphr=this.clonePres(e.data);
    this.displayDlg=true;
  }
  showDialogToAdd() {
    this.newphr = true;
    this.selectedphr=new DailyMedClass() ;
    this.displayDlg = true;
}

save() {
  let pres = [...this.prescriptions];
  
  if (this.newphr)
      pres.push(this.selectedphr);
  else{
    console.debug(this.prescriptions, this.selectedphr,this.prescriptions.indexOf(this.selectedphr)); 
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
  let pr:DailyMed=JSON.parse(JSON.stringify(c));


  return pr;
}
}
