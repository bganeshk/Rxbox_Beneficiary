import { Component, OnInit } from '@angular/core';
import { MetadataService, HealthType, HealthRec } from 'src/app/global/metadata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-mgnt-template',
  templateUrl: './mgnt-template.component.html',
  styleUrls: ['./mgnt-template.component.css']
})

export class MgntTemplateComponent implements OnInit {
  healthType:HealthType[]
  mnuType:string;
  cols:any[];
  colsDlg:any[];
  custSelectedRecs:HealthRec[];
  custRecs:HealthRec[];
  showDetailDlg:boolean;
  showRecTblDlg:boolean;
  items: MenuItem[];
  
  visibilty:Map<string, boolean>;
  selectedRec: HealthRec;
  selectedNewRec: HealthRec;

  constructor(private mdtSrvs:MetadataService, 
    private messageService: MessageService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.visibilty= new Map();
    this.healthType=this.mdtSrvs.getHealthType();
    this.mnuType=this.route.snapshot.data['status'];
  //  this.custSelectedRecs=this.mdtSrvs.getCustSelectedRec();
    this.custRecs=this.mdtSrvs.getCustSelectedRec();
    console.debug(this.custRecs);
    this.cols = [
      { field: 'rec_no', header: 'RecordId' },
      { field: 'recType', header: 'Type' },
      { field: 'created_on', header: 'Created On' }
  ];
  this.colsDlg = [
    { field: 'rec_no', header: 'RecordId' },
    { field: 'recIssuer', header: 'Issuer' },
    { field: 'created_on', header: 'Created On' }
];
  this.items = [
    {label: 'Summary Rec', icon: 'pi pi-folder', command: () => {
        this.getRecOfType('smry_ehr');
    }},
    {label: 'Lab Report', icon: 'pi pi-folder-open', command: () => {
        this.getRecOfType('lab_ehr');
    }},
    {label: 'Family Health Rec', icon: 'pi pi-users', command: () => {
      this.getRecOfType('fmly_ehr');}},
    {separator: true},
    {label: 'Other Health Rec', icon: 'pi pi-paperclip', command: () => {
      this.getRecOfType('oth_ehr');}},
  //  {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
];
  }
  getRecOfType(arg0: string) {
    this.showRecTblDlg=true;
    //throw new Error("Method not implemented.");
  }

  setVisibility(rec:string){
    console.debug(rec, this.visibilty.get(rec));
    if(this.visibilty.get(rec)){
      this.visibilty.set(rec,false);
    }else{
      this.visibilty.set(rec,true);
    }
    this.messageService.add({severity:'info', summary:'Visibiliy Updated', detail:'Visibiliy setting has been updated successfully'});

  }
  removeFromCosnent(rec:HealthRec){
    this.custSelectedRecs.splice(this.custRecs.indexOf(rec),1);
  }
  addToCosnent(rec:HealthRec){
    if(!this.custSelectedRecs){
      this.custSelectedRecs=new Array();
    }
    this.custSelectedRecs.push(rec);
    this.custRecs.splice(this.custRecs.indexOf(rec),1);
  }


showRecDlg(srec:HealthRec){
  this.showDetailDlg = true;
  console.debug("row slected ")
}

onDialogHide(e){
  console.debug("dialog close");
}

}

