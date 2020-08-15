import { Component, OnInit } from '@angular/core';
import { MetadataService, } from 'src/app/global/metadata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { HealthType, HealthRec, ConsentService, EhrService} from 'rx-lib';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-mgnt-template',
  templateUrl: './mgnt-template.component.html',
  styleUrls: ['./mgnt-template.component.css'],
  providers:[ConsentService,EhrService]
})

export class MgntTemplateComponent implements OnInit {
  healthType: HealthType[]
  mnuType: string;
  cols: any[];
  colsDlg: any[];
  custSelectedRecs: HealthRec[];
  custRecs: HealthRec[];
  showDetailDlg: boolean;
  showRecTblDlg: boolean;
  items: MenuItem[];
  selectedRec: HealthRec;
  selectedNewRec: HealthRec;
  newVisible:string[];
  templName:string;
  constructor(private mdtSrvs: MetadataService,
    private messageService: MessageService,
    private conSrvs:ConsentService, private ehrSrvs:EhrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.newVisible=[];
    this.mdtSrvs.getJSONRef().then(e => {
      this.healthType = this.mdtSrvs.getHealthType();
     
    });
    this.mnuType = this.route.snapshot.data['status'];
    
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
      {
        label: 'Summary Rec', icon: 'pi pi-folder', command: () => {
          this.getRecOfType('smry_ehr');
        }
      },
      {
        label: 'Lab Report', icon: 'pi pi-folder-open', command: () => {
          this.getRecOfType('lab_ehr');
        }
      },
      {
        label: 'Family Health Rec', icon: 'pi pi-users', command: () => {
          this.getRecOfType('fmly_ehr');
        }
      },
      { separator: true },
      {
        label: 'Other Health Rec', icon: 'pi pi-paperclip', command: () => {
          this.getRecOfType('oth_ehr');
        }
      },
      //  {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
    ];
  }
  getRecOfType(typ: string) {
    this.templName="";
    this.ehrSrvs.getEhrsOfType(typ).then(res=>{
      this.custRecs=res;
      this.showRecTblDlg = true;
      
    })
    .catch(err=>{
      console.error(err);
    });
    //throw new Error("Method not implemented.");
  }

  toggleVisibility(rec) {
    if (this.mnuType == 'gen' ||this.mnuType == 'publi'){
      this.conSrvs.updatePublicVisibility('gen',rec.key).then(res=>{
        this.messageService.add({ severity: 'info', summary: 'Visibiliy Updated', detail: 'Visibiliy setting has been updated successfully' });
      })
      .catch(err=>{
        this.messageService.add({ severity: 'error', summary: 'Update Failed', detail: 'Visibiliy setting update failed' });
        console.log(err);
      })
    }else{
      // it will be custom and will be saved as part of save action
      if(this.newVisible?.indexOf(rec.key)>-1){
        this.newVisible.splice(this.newVisible.indexOf(rec.key),1);        
      }else{
       this.newVisible.push(rec.key);
      }
      rec.value.visible=!rec.value.visible;
      let keyString:string=rec.key;
      if(keyString.startsWith('all')){
        this.toggleAllVisibility(rec);
      }else{
        this.healthType .forEach(pe => {
          if(pe.typeOpt.has(rec.key)){
            pe.typeOpt.forEach( (e,k) =>{
              if(k.startsWith('all')){
                e.visible=false;
              }
            })}   
        });    
      }
    }
  }

  toggleAllVisibility(rec: any) {
    this.healthType .forEach(pe => {
      if(pe.typeOpt.has(rec.key)){
      pe.typeOpt.forEach(e=>{
        e.visible=rec.value.visible;
      })}      
    });

  }


  removeFromCosnent(rec: HealthRec) {
    this.custSelectedRecs.splice(this.custRecs.indexOf(rec), 1);
  }
  addToCosnent(rec: HealthRec) {
    if (!this.custSelectedRecs) {
      this.custSelectedRecs = new Array();
    }
    this.custSelectedRecs.push(rec);
    this.custRecs.splice(this.custRecs.indexOf(rec), 1);
  }

  saveCustTemplate(){
    let req:any={};
    if(!this.templName ||this.templName.length<5){
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Template name has to be atleast 5 character' });
    }
    else if(this.newVisible?.length>0 || this.custSelectedRecs?.length>0){
       req['tplName']=this.templName;
       req['custRec']=this.custSelectedRecs;
       req['visib']=this.newVisible;
       this.ehrSrvs.saveCustTemplate(req).then(res=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Template has been created' });
       })
       .catch(err=>{
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Template creation failed' });
        
      });
    }else{
      this.messageService.add({ severity: 'info', summary: 'Failed', detail: 'No change detected' });
    }
  }

  showRecDlg(srec: HealthRec) {
    this.showDetailDlg = true;
    console.debug("row slected ")
    throw new Error('Method not implemented');
  }



}

