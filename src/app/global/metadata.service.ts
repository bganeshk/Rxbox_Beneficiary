import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { Profiledet, ProfileAdd } from 'bee-lib';
import { Url } from 'url';
import { SelectItemGroup } from 'primeng/api';



export interface ehr_bp{
  ehrId:string;
  dias:number;
  syst:number;
  auditData:AuditData;
}

export interface ehr_diabetic{
  ehrId:string;
  bf:number;
  af:number;
  auditData:AuditData;
}
export interface ehr_tempoxypulse{
  ehrId:string;
  temp:number;
  oxireading:number;
  pulsepersec:number;
  auditData:AuditData;
}

export interface ehr_other{
  ehrId:string;
  ehrCategory:string;
  dataValue:Map<string,string>;
  auditData:AuditData;
}

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

export class DailyMedClass implements DailyMed{

}
export interface DailyMed {
  pid?:string;
  med?:Medicine;
  afterFood?:String;
  morningQty?:number;
  afternoongQty?:number; 
  eveninggQty?:number;
  medType?:string;
  medNotes?:string;  
  repeatCycle?:string;//Daily, every monday
  repeatCycleNumber?:string//everymondy for 5times or everymonth for 12 months
  numberOfCycle?:number;//number of days to consme the medicine -1 for indefiniete
  startDate?:Date;
  endDate?:Date;//need to fill after calculation
  prescribedBy?:string;
  prescribed_dt?:Date;
 
}

export interface Prescription{
  pid:string;
  prescribedBy?:string;
  prescribed_dt?:Date;
  medNotes?:string;  
  medicine:DailyMed[];
}

export interface FullFillmentSummary{
  totalQty:number;
  fullfilledQty:number;
  balanceQty?:number;
  nextRefill:Date;
  lastRefill:Date;
  totalNoRefill:number;
  fullfillpercentage?:number;
}

export interface MedFFill{
  purchaseQty:number;
  fullfilledBy?:string;
  purchase_dt?:Date;
  purchaseAmnt?:number;
}

export interface MedFullFillment{
  pid:string;
  medi:DailyMed; 
  fullFillsmry:FullFillmentSummary;
  fullFillDetails?:MedFFill[];
}

export class MedFullFillmentC implements MedFullFillment{
  pid:string;
  medi: DailyMed;
  fullFillsmry: FullFillmentSummary;
  fullFillDetails?:MedFFill[];
}

export interface Medicine{
 id:string;
 medname:string;
 genericName:string;
 dose:string;
 expDt:Date;
 mfgDt:Date;
 manufacturer:string;
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
 
 
 
 
  getPrescription(): Prescription[] {
    let pres:Prescription[]=[
      { pid:'1',prescribedBy:'Dr GK',prescribed_dt:new Date(), medNotes:'No notes',medicine:null},
      { pid:'2',prescribedBy:'Dr GK2',prescribed_dt:new Date(), medNotes:'No notes',medicine:null}
    ]
    pres[0].medicine=this.getDailyMed();
    pres[1].medicine=this.getDailyMed();
    return pres;
  }
  
  
  getMedFullFillments():MedFullFillment[]{
    var mdfill:MedFullFillment[]=[];
    for(let i=0;i<5;i++){
        let mdf=new MedFullFillmentC();
        mdf.medi=this.getDailyMed()[i];
        mdf.fullFillsmry={ totalQty:Math.floor(Math.random() * 10),lastRefill:new Date(),fullfilledQty:Math.floor(Math.random() * 10)/2,nextRefill:new Date(),totalNoRefill:2};
        let fullfillpercentage=Math.floor( (100*mdf.fullFillsmry.fullfilledQty)/mdf.fullFillsmry.totalNoRefill);
        mdf.fullFillsmry.fullfillpercentage=fullfillpercentage;
        mdf.pid=i+'';
        mdf.fullFillDetails=[
          {purchaseQty:2,fullfilledBy:'Gk Medicals',purchaseAmnt:30.90,purchase_dt:new Date()},
          {purchaseQty:2,fullfilledBy:'Gk Medicals',purchaseAmnt:30.90,purchase_dt:new Date()},
          {purchaseQty:2,fullfilledBy:'Gk Medicals',purchaseAmnt:30.90,purchase_dt:new Date()},
        ];
        mdfill.push(mdf);
    }
    return mdfill;
  }
  getMedicines():Medicine[]{
    return [
      {id:'1',medname:'medname1',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'},
      {id:'2',medname:'medname2',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'},
      {id:'3',medname:'medname3',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}
    ];
  }
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

  getDailyMed():DailyMed[]{
    var dm = [
      { pid:'1',prescribedBy:'Dr.Ganesh kumare balasubramonian PRS',med:{ id:'1',medname:'paracetamol',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'Y', morningQty: 1, afternoongQty: 0, eveninggQty: 1, medType: 'C', medNotes: 'water mix' ,numberOfdays:-1,startDate:new Date(),endDate:new Date()},
      { pid:'2',prescribedBy:'Dr.GK',med:{ id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'} , afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50',numberOfdays:1,endDate:new Date() },
      { pid:'3',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'Y', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'4',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:10},
      { pid:'5',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'6',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'7',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'8',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'9',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'10',prescribedBy:'Dr.GK',med: { id:'1',medname:'dolo-23-25ml',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:1}
    ];
  return dm;
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
  public getEhrCategoryList():SelectItem[]{
    return [
      {label: 'Summary Report', value: 'Summary_Report'},
      {label: 'Lab Report', value: 'Lab_Report'},
      {label: 'Mental Record', value: 'Mental_Record'},
      {label: 'Sexual Record', value: 'Sexual_Record'},
      {label: 'Heart/Cardiac Report', value: 'Cardiac_Report'},
      {label: 'Eye/Opthalmic Report', value: 'Opthalmic_Report'},
      {label: 'Family Report', value: 'Family_Report'}];
  }
  public getEhrCategoryDetList(): SelectItemGroup[] {
    return [
      {
        label: 'Heart/Cardiac',
        items: [
          { label: 'Procedure', value: 'CAR_PRO' },
          { label: 'Other', value: 'CAR_OTH' }
        ]
      },  {
        label: 'Phsycology & Mental',
        items: [
          { label: 'Counseling', value: 'MENT_COUS' },
          { label: 'Others', value: 'MENT_OTH' },
        ]
      }, {
        label: 'Eye/opthalmic',
        items: [
          { label: 'Cadillac', value: 'Cadillac' },
        ]
      },{
        label: 'Sexual Records',
        items: [
          { label: 'Skin & Infections', value: 'SEX_SKINF' },
          { label: 'Other', value: 'SEX_OTH' },          
        ]
      },
       {
        label: 'Procedures & Operations',
        items: [
          { label: 'General', value: 'PRO_GEN' },
        ]
      }]

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
