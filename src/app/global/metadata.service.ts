import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { Profiledet, ProfileAdd } from 'bee-lib';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';


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

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
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
}
