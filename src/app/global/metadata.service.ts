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
      {label: 'Summary Report', value: 'gen'},
      {label: 'Lab Report', value: 'pub'},
      {label: 'Mental Record', value: 'pub'},
      {label: 'Sexual Record', value: 'pub'},
      {label: 'Heart/Cardiac Report', value: 'pub'},
      {label: 'Eye/Opthalmic Report', value: 'pub'},
      {label: 'Family Report', value: 'cust'}];
  }
}
