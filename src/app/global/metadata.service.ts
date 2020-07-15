import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { Profiledet, ProfileAdd } from 'bee-lib';
import { Url } from 'url';
import { SelectItemGroup } from 'primeng/api';

export interface RxNote{
  recId:string;
  rxNote:string;
  refNumber?:string;
  metadata?:AuditData;
}

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
  reqId:string;
  reqCreated_on:Date;
  reqCreater:string;
  beneficiary:Beneficiary;  
  access_statrdt:Date;
  status:string;
  reqAccess_category:string[];
  access_type:string;//view,edit/upload
  remarks:string;
  requstor_details:ProfileAdd
}
export interface HealthType{
  typeName:string;
  typeOpt:Map<string,string>;
}

export interface FmlyHealthRec {
  realtions:string[];
  data:HealthRec;
}
export interface SummaryHealthRec extends HealthRec{
  admissionDt:Date;
  dischargeDate:Date;
  summaryNote:string;
  refRecNo:Set<string>;  
  attachments:URL[];
}

export interface  HealthRec{
  rec_no:string;
  desc:string;  
  dataValue?:Map<string,string>;
  recType:string;
  recTypeDesc?:string;
  refNumber:string;
  recRequester?:string;
  requesterDetails?:ProfileAdd
  reqDate?:Date;
  recIssuer:string;
  issuerDetails?:ProfileAdd
  issueDate?:Date;
  attachments:URL[];
  remarks?:string;
  metadata:AuditData;
  recFullfilled?:boolean;//to indicate whether the requet is completed or not
}

export interface AuditData{
  created_on:Date;
  updated_on?:Date;
  version:number;
  createdBy:string;
  updatedBy?:string;
}

export interface ServiceProvider {
  providerId:string;
  providerName:string;
}
export interface Beneficiary{
  beId:string;
  beName:string;
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
  endDate?:Date;//need to fill after calculation or while stopping
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
  newQty?:number;
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
 
getSummaryHealthRec():SummaryHealthRec[]{
    let smryRecs:SummaryHealthRec[]=[];
    this.getCustSelectedRec().forEach(e => {
      let smry:SummaryHealthRec=JSON.parse(JSON.stringify(e));
      smry.admissionDt=new Date();
      smry.dischargeDate=new Date();
      smry.refNumber=e.rec_no;
      smry.summaryNote=" Summary of case number "+e.rec_no;
      if(e.attachments){
        smry.attachments=[];  
        smry.attachments=smry.attachments.concat(e.attachments);
        smry.refNumber="EHR20200618-"+e.rec_no;
      }
      smryRecs.push(smry);
    });
    return smryRecs;
 }
 
  getLabHealthRec():HealthRec[]{
    let fmlyRecs:HealthRec[]=[];
    this.getCustSelectedRec().forEach(e => {
      if("lab_report"===e.recType){
      e.dataValue.set('Platelet','200000');
      e.dataValue.set('Blood Count','10000/mg');
      e.issueDate=new Date();
      fmlyRecs.push(e);
      }
    });
    return fmlyRecs;
  }
  

  getRxNote():RxNote[]{
    return [
      {recId:'1',metadata:{created_on:new Date(),createdBy:'Dr.GKumar',version:1},
      rxNote:'The patient a 56-year-oldCaucasian male. He is currently diagnosed with Major Depressive Disorder and Anxiety Disorder and has been experiencing symptoms for many years. Jimpresents well, appearing well-spoken. However, upon delving deeper into his history and symptoms, he experiences a significant amount of anxiety, tension,and paranoia surrounding his day-to-day life. He has difficulties in social situations, especially meeting new people,being incrowded areas, or tolerating social situations. He often picks at his hands when relaying symptoms and is in pain daily. He experiencessignificant symptoms of depression aswell that debilitate him tothepoint of being unable to leave his houseor tent. He is easily agitated and quick to become angry.He feels that his mood shifts quickly where one moment he isfunctional and the next he can’t leave the house or tent. He is always on edge, and when feeling depressed,can’t move and it’s hard to even get out of bed. He feels shaky and unsteadyas he isolates from others'},
      {recId:'2',metadata:{created_on:new Date(),createdBy:'Dr.GKumar',version:1},rxNote:'This note has to be used only as sample note for the medical condition provided by the doctor and other medical practitioner. The situation of the note may be changing after over a period of time so reading and updating is not part of this. the notes are not updatable but new notes could be created in parallel in the system . Both notes can co-exists in the same way we looking now'},
      {recId:'3',metadata:{created_on:new Date(),createdBy:'Dr.GKumar',version:1},rxNote:'This note has to be used only as sample note for the medical condition provided by the doctor and other medical practitioner. The situation of the note may be changing after over a period of time so reading and updating is not part of this. the notes are not updatable but new notes could be created in parallel in the system . Both notes can co-exists in the same way we looking now'},
      {recId:'4',metadata:{created_on:new Date(),createdBy:'Dr.GKumar',version:1},rxNote:'This note has to be used only as sample note for the medical condition provided by the doctor and other medical practitioner. The situation of the note may be changing after over a period of time so reading and updating is not part of this. the notes are not updatable but new notes could be created in parallel in the system . Both notes can co-exists in the same way we looking now'},

    ]
  }

 getFmlyHealthRec():FmlyHealthRec[]{
   let fmlyRecs:FmlyHealthRec[]=[];
    this.getCustSelectedRec().forEach(e => {
      if('family_rec'===e.recType){
      e.dataValue.set('Diabatic','230');
      e.dataValue.set('Cholestrol','199');
      let fmlyRec:FmlyHealthRec;
      fmlyRec={realtions:['Father','Mother'],data:e}
      fmlyRecs.push(fmlyRec);
      }
     
    });
    return fmlyRecs;
 }
  getPrescription(): Prescription[] {
    let pres:Prescription[]=[
      { pid:'1',prescribedBy:'Dr GKumar',prescribed_dt:new Date(), medNotes:'This medical presciption does not have any valid notes. this is created as sample note to display how an actula notes looks like in the system. This may give overall idea of how notes are created and presented to the end user',medicine:null},
      { pid:'2',prescribedBy:'Dr Xing',prescribed_dt:new Date(), medNotes:'This medical presciption does not have any valid notes. this is created as sample note to display how an actula notes looks like in the system',medicine:null}
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
      {id:'1',medname:'Calpol-250mg',genericName:'name2',dose:'250mg',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'},
      {id:'2',medname:'Tab-200mg',genericName:'name2',dose:'200mg',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'},
      {id:'3',medname:'Tab3-10mg',genericName:'name2',dose:'10mg',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}
    ];
  }
  getCustSelectedRec(): HealthRec[] {
    var hrec=[
      {rec_no:'sum/10102020110/234567891',dataValue:new Map() ,recType:'summary_rec',created_on:new Date(),desc:'Summary of admission due to headhache',refNumber:null,recIssuer:'GK Hospital',
      attachments:[new URL('ftp://lab_cult_test1.pdf'),new URL('ftp://lab_cult_test1.pdf')],metadata:null},
      {rec_no:'lab/1010/2020110234567891',dataValue:new Map(),recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for virus test',refNumber:null,recIssuer:'DDRC',attachments:null,metadata:null},
      {rec_no:'sum/10102020110234567892',dataValue:new Map(),recType:'summary_rec',created_on:new Date(),desc:'Summary of admission due to viral fever',refNumber:null,recIssuer:'GK Hospital',attachments:null,metadata:null},
      {rec_no:'lab/20102020110234567892',dataValue:new Map(),recRequester:'Dr.Gkumar' , recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for cuture test',refNumber:'203Ref/2323/2f',recIssuer:'LAb 1',attachments:null,metadata:null},
      {rec_no:'sum/10102020110234567893',dataValue:new Map(),recType:'summary_rec',created_on:new Date(),desc:'Summary of admission by accident',refNumber:null,recIssuer:'df',attachments:null,metadata:null},
      {rec_no:'lab/11102020110234567893',dataValue:new Map(),recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for bloodsugar test',refNumber:null,recIssuer:'dsf',attachments:null,metadata:null},
      {rec_no:'lab/12102020110234567894',dataValue:new Map(),recType:'lab_report',created_on:new Date(),desc:'Lab test conducted for virus test after antibody',refNumber:null,recIssuer:'sdf',attachments:null,metadata:null},
      {rec_no:'fmly/1102020110234567891',dataValue:new Map(),recType:'family_rec',created_on:new Date(),desc:'diabetic history',refNumber:null,recIssuer:'sdf',attachments:null,metadata:null},
      {rec_no:'other/102020110234567891',dataValue:new Map(),recType:'other_rec',created_on:new Date(),desc:'genric activity test',refNumber:null,recIssuer:'sdfsd',attachments:null,metadata:null}
    ];
    return hrec;
  }

  getDailyMed():DailyMed[]{
    var dm = [
      { pid:'1',prescribedBy:'Dr.Ganesh kumar (SRS Hospital)',med:{ id:'1',medname:'p-amol',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'Y', morningQty: 1, afternoongQty: 0, eveninggQty: 1, medType: 'C', medNotes: 'water mix' ,numberOfdays:-1,startDate:new Date(),endDate:new Date()},
      { pid:'2',prescribedBy:'Dr.Doctor Name',med:{ id:'1',medname:'dolo-23-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'} , afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50',numberOfdays:1,endDate:new Date() },
      { pid:'3',prescribedBy:'Dr.Doctor Name2',med: { id:'1',medname:'Capo-23-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'Y', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'4',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Abra-23-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:10},
      { pid:'5',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Kada-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'6',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Bara-15mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'7',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Tilu-43-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'8',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Kotil-33-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'9',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Botin-23-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' ,numberOfdays:1},
      { pid:'10',prescribedBy:'Dr.Doctor Name',med: { id:'1',medname:'Chemos-13-25mg',genericName:'name2',dose:'50ml',expDt:new Date(),mfgDt:new Date(),manufacturer:'Cipla'}, afterFood: 'N/A', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' ,numberOfdays:1}
    ];
  return dm;
  }
  getConsReq(staus?: string,drId?:string): ConsntReq[] {
   // throw new Error("Method not implemented.");
   return [
         {reqId:'Con/12/12-1',reqCreated_on:new Date(),status:'Pending',reqCreater:'Dr.Gkumar (SRS Hospital)', access_statrdt:new Date(), reqAccess_category:['Family_health'], access_type:'view',remarks:'I am from hospital SRS, Plesae provide access to get the details of history',
          requstor_details:{
            adId:'343',
            primemobile:'3498787654',
            primeEmail: 'exg@sample.com',
            city: 'city',
            state: 'state',
            pin: '3434', primephoneStatus:null, primeemailStatus:null, 
            address_line1:'address-line1', 
            address_line2 :'address-line2'
          },beneficiary:{beId:"34f3d3",beName:'Patient 1'}
        },
         {reqId:'Con/12/12-2',reqCreated_on:new Date(),status:'New',reqCreater:'Dr GRS2', access_statrdt:new Date(), reqAccess_category:['Cardiac'], access_type:'All',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 3'}} ,
         {reqId:'Con/12/12-3',reqCreated_on:new Date(),status:'Expired',reqCreater:'Dr GRS3', access_statrdt:new Date(), reqAccess_category:['Summary'], access_type:'All',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 2'}} ,
         {reqId:'Con/12/12-3',reqCreated_on:new Date(),status:'Pending',reqCreater:'Dr GRS4', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'view',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 4'}} ,
         {reqId:'Con/12/12-4',reqCreated_on:new Date(),status:'Approved',reqCreater:'Dr GRS2', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'All',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 5'}} ,
         {reqId:'Con/12/12-5',reqCreated_on:new Date(),status:'Approved',reqCreater:'Dr GRS2', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 1'}} ,
         {reqId:'Con/12/12-6',reqCreated_on:new Date(),status:'New',reqCreater:'Dr Klm kong S3', access_statrdt:new Date(), reqAccess_category:['Lab'], access_type:'',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 3'}} ,
         {reqId:'Con/12/12-7',reqCreated_on:new Date(),status:'Approved',reqCreater:'SRS', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 3'}} ,
         {reqId:'Con/12/12-8',reqCreated_on:new Date(),status:'Pending',reqCreater:'Kolmn', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 2'}} ,
         {reqId:'Con/12/12-9',reqCreated_on:new Date(),status:'Expired',reqCreater:'Komn', access_statrdt:new Date(), reqAccess_category:[''], access_type:'',remarks:'The sample rempark is created by the consultantn doctor for demo purpose . The actual content may vary based on the comments created by the practioner', requstor_details:null,beneficiary:{beId:"34f3d3",beName:'Patient 2'}} ,          
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
          { label: 'Procedures', value: 'CAR_PRO' },
          { label: 'Other Cardiac', value: 'CAR_OTH' }
        ]
      },  {
        label: 'Psychology & Mental',
        items: [
          { label: 'Counseling', value: 'MENT_COUS' },
          { label: 'Others psychology', value: 'MENT_OTH' },
        ]
      }, {
        label: 'Eye/Opthalmic',
        items: [
          { label: 'Vision related', value: 'VSI_EYE' },
          { label: 'Other Opthalmic', value: 'OPT_EYE' },
        ]
      },{
        label: 'Sexual Records',
        items: [
          { label: 'Skin & Infections', value: 'SEX_SKIN' },
          { label: 'Other Skin', value: 'SEX_OTH' },          
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
    ghrtype.set('nodrec','Neuro diseases Records');
    ghrtype.set('dlsrec','Dialysis Records');
    return ghrtype
  }
  private getPersonalHealthType(){
    var phrtype=new Map();
    phrtype.set('alphr', 'All');
    phrtype.set('vacnan', 'Vaccination Details');
    phrtype.set('alrmed', 'Allergic Details');
    phrtype.set('lifest', 'Lifestyle');
    phrtype.set('orgtrn', 'Organ Transplanted');
    phrtype.set('hevent', 'Health Events');
    phrtype.set('hroadmap', 'Health Roadmap');
    return phrtype    
    
  }
  private getEHealthType(){
    var ehrtype=new Map();
    ehrtype.set('allehr', 'All');
    ehrtype.set('fmlrec', 'Family reocrd');
    ehrtype.set('labrpt', 'Lab Reports');
    ehrtype.set('dcrsmr', 'Discharge Summary');
    ehrtype.set('gendoc', 'Generic Documnets');
    ehrtype.set('dailpil', 'Daily Pills');
    ehrtype.set('dailpil', 'Health Summary/Indica:');
    return ehrtype

  }
}
