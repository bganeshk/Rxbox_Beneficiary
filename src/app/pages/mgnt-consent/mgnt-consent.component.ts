import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';


export interface Consnt{
  created:Date,
  cosnt_name:string,
  cosnt_type:string,
  validity:string,
  validity_unit:string,
  cosnt_tag:string[],
  cosnt_assignee:string[],
  cosnt_cat_type:string[],
  cosnted_ehr:string[],
  is_active:boolean;
  remarks:string;
}




@Component({
  selector: 'app-mgnt-consent',
  templateUrl: './mgnt-consent.component.html',
  styleUrls: ['./mgnt-consent.component.css']
})
export class MgntConsentComponent implements OnInit {
  cosnt_type:SelectItem[];
  cosnt_cat_type:SelectItem[];
  valididty_unty:SelectItem[];
  search_dtrange:Date[]
  cosnt_name:string;
  cosnt_tag:string[];
  cosnts: Consnt[];
  selectedCons:Consnt;
  cols: any[];
  displayDialog: boolean;
  displayEditDialog: boolean;


  constructor() { }

  ngOnInit() {
    this.cosnt_type=[
      {label: 'Generic Consents', value: 'gen'},
      {label: 'Public Consents', value: 'pub'},
      {label: 'Custom Consents', value: 'cust'}];
    this.cosnt_cat_type=[
        {label: 'Summary Report', value: 'gen'},
        {label: 'Lab Report', value: 'pub'},
        {label: 'Mental Record', value: 'pub'},
        {label: 'Sexual Record', value: 'pub'},
        {label: 'Heart/Cardiac Report', value: 'pub'},
        {label: 'Eye/Opthalmic Report', value: 'pub'},
        {label: 'Family Report', value: 'cust'}];
    
    this.valididty_unty=[
          {label: 'Days', value: 'd'},
          {label: 'Weeks', value: 'w'},
          {label: 'Months', value: 'm'}];
        this.getConsents();    
    }

    selectConsent(event: Event, cn: Consnt) {
      this.selectedCons = cn;
      this.displayDialog = true;
      event.preventDefault();
  }

  editSelectConsent(event: Event, cn: Consnt) {
    this.selectedCons = cn;
    this.displayEditDialog = true;
    this.displayDialog = false;
    event.preventDefault();
   }

  onDialogHide() {
    this.selectedCons = null;
}
    getConsents(){
      this.cosnts=[
        {cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
        {cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:['Summary Report','Lab Report'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
      ];
    }
}
