import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { Profiledet, ProfileAdd } from 'cmn-lib';
import {SummaryHealthRec, HealthRec, RxNote, FmlyHealthRec, Prescription, MedFullFillment, MedFullFillmentC, Medicine, DailyMed, ConsntReq} from 'rx-lib';
import { Url } from 'url';
import { SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  private _jsonURL = 'assets/data/references.json';
  private jsonRefData;


  constructor(private http: HttpClient) {
    this.getJSONRef()
    
   }
   
   public getJSONRef() {
      return this.http.get(this._jsonURL).toPromise().then(res =>{
        this.jsonRefData=res;
        res;
      }); 
   }

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
 
  
  
  getMedFullFillments():MedFullFillment[]{
    var mdfill:MedFullFillment[]=[];
    for(let i=0;i<5;i++){
        let mdf=new MedFullFillmentC();
       // mdf.medi=this.getDailyMed()[i];
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
    return this.jsonRefData.consentValType.data;
  }

  public getConsentTypeList():SelectItem[]{
    return this.jsonRefData.consentType.data;
  }
  public getEhrCategoryList():SelectItem[]{
    return this.jsonRefData.ehrCategory.data;
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
