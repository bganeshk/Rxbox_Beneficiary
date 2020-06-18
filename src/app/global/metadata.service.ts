import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { Profiledet, ProfileAdd } from 'bee-lib';
import { Url } from 'url';


export interface Consnt{
  cons_id:string
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

export interface ConsntReq{
  reqCreated_on:Date;
  reqCreater:string;
  access_statrdt:Date;
  reqAccess_category:string[];
  access_type:string;//view,edit/upload
  remarks:string;
  requstor_details:ProfileAdd
}
export interface HealthType{
  typeName:string;
  typeOpt:Map<string,string>;
}

export interface HealthRec{
  rec_no:string;
  desc:string;
  recType:string;
  refNumber:string;
  recIssuer:string;
  attachments:URL[];
  metadata:AuditData;
}

export interface AuditData{
  created_on:Date;
  version:number;
  createdBy:string;
}


@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  
  getCustSelectedRec(): HealthRec[] {
    var hrec=[
      {rec_no:'sum10102020110234567891',recType:'summary_rec',created_on:new Date(),desc:'Summary of admission due to headhache',refNumber:null,recIssuer:'GK Hospital',
      attachments:[new URL('ftp://lab_cult_test1.pdf'),new URL('ftp://lab_cult_test1.pdf')],metadata:null},
      {rec_no:'lab10102020110234567891',recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for virus test',refNumber:null,recIssuer:'DDRC',attachments:null,metadata:null},
      {rec_no:'sum10102020110234567892',recType:'summary_rec',created_on:new Date(),desc:'Summary of admission due to viral fever',refNumber:null,recIssuer:'GK Hospital',attachments:null,metadata:null},
      {rec_no:'lab20102020110234567892',recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for cuture test',refNumber:null,recIssuer:'LAb 1',attachments:null,metadata:null},
      {rec_no:'sum10102020110234567893',recType:'summary_rec',created_on:new Date(),desc:'Summary of admission by accident',refNumber:null,recIssuer:'df',attachments:null,metadata:null},
      {rec_no:'lab11102020110234567893',recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for bloodsugar test',refNumber:null,recIssuer:'dsf',attachments:null,metadata:null},
      {rec_no:'lab12102020110234567894',recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for virus test after antibody',refNumber:null,recIssuer:'sdf',attachments:null,metadata:null},
      {rec_no:'fmly1102020110234567891',recType:'family_rec',created_on:new Date(),desc:'diabetic history',refNumber:null,recIssuer:'sdf',attachments:null,metadata:null},
      {rec_no:'other102020110234567891',recType:'other_rec',created_on:new Date(),desc:'genric activity test',refNumber:null,recIssuer:'sdfsd',attachments:null,metadata:null}
    ];
    return hrec;
  }


  getConsReq(staus: string): ConsntReq[] {
   // throw new Error("Method not implemented.");
   return [
         {reqCreated_on:new Date(),reqCreater:'gk1', access_statrdt:new Date(), reqAccess_category:['Family_health'], access_type:'view',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
          requstor_details:{
            adId:'343',
            primemobile:'34334343',
            primeEmail: 'eeee@elementEventFullName.ee',
            city: 'ciuty',
            state: 'state',
            pin: '3434', primephoneStatus:null, primeemailStatus:null, 
            address_line1:'address_line1', 
            address_line2 :'address_line2'
          }
        },
         {reqCreated_on:new Date(),reqCreater:'gk2', access_statrdt:new Date(), reqAccess_category:['Cardiac'], access_type:'All',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk3', access_statrdt:new Date(), reqAccess_category:['Summary'], access_type:'All',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk4', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'view',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk5', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'All',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk6', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk7', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk8', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk9', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,
         {reqCreated_on:new Date(),reqCreater:'gk10', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'my ream 1 is created as remarks for fsadlfjlsadkfjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', requstor_details:null} ,          
   ];
  }
  getConsentValidityUnit(): SelectItem[] {
    return [
      {label: 'Days', value: 'd'},
      {label: 'Weeks', value: 'w'},
      {label: 'Months', value: 'm'}];
   
  }

  constructor(private httpClient: HttpClient) {

  }

  public getConsentTypeList():SelectItem[]{
    return [
      {label: 'Generic Consents', value: 'gen'},
      {label: 'Public Consents', value: 'pub'},
      {label: 'Custom Consents', value: 'cust'}];
  }
  public getConsentCategoryList():SelectItem[]{
    return [
      {label: 'Summary Report', value: 'Summary_Report'},
      {label: 'Lab Report', value: 'Lab_Report'},
      {label: 'Mental Record', value: 'Mental_Record'},
      {label: 'Sexual Record', value: 'Sexual_Record'},
      {label: 'Heart/Cardiac Report', value: 'Cardiac_Report'},
      {label: 'Eye/Opthalmic Report', value: 'Opthalmic_Report'},
      {label: 'Family Report', value: 'Family_Report'}];
  }

  public getHealthType(){
    var htype=[
      {
      typeName:'Personal',
      typeOpt:this.getPersonalHealthType()
    },{
      typeName:'General',
      typeOpt:this.getGeneralHealthType()
    },{
      typeName:'eHR',
      typeOpt:this.getEHealthType()
    },
  ];
    return htype;
  }
  private getGeneralHealthType(){
    var ghrtype=new Map();
    ghrtype.set('allghr', 'All');
    ghrtype.set('diarec', 'Diabetic Records');
    ghrtype.set('prsrec','Pressure Records');
    ghrtype.set('crdrec','Cardiac Record');
    ghrtype.set('nodrec','Neuro diceces Records');
    ghrtype.set('dlsrec','Daialysis Records');
    return ghrtype
  }
  private getPersonalHealthType(){
    var phrtype=new Map();
    phrtype.set('alphr', 'All');
    phrtype.set('vacnan', 'Vaccinations');
    phrtype.set('algmed', 'Allergic to medicine');
    phrtype.set('smking', 'Smoking');
    phrtype.set('alzchlc', 'Alcaholic');
    phrtype.set('orgtrn', 'Organ Transplanted');
    return phrtype
    
    
  }
  private getEHealthType(){
    var ehrtype=new Map();
    ehrtype.set('allehr', 'All');
    ehrtype.set('fmlrec', 'Family reocrd');
    ehrtype.set('labrpt', 'Lab Reports');
    ehrtype.set('dcrsmr', 'Discharge Summary');
    ehrtype.set('gendoc', 'Generic Documnets');
    return ehrtype

  }
}
