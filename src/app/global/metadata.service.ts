import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
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
