import { Injectable } from '@angular/core';
import { RxNote, AuditData } from './metadata.service';




export interface Review{
  refNo:string;
  desc:string;
  lastReviewDate:Date;
  drId:string;
  patientId:string;
  notes:RxNote[];
  metadata:AuditData;
}
@Injectable({
  providedIn: 'root'
})
export class DrViewdataService {

  constructor() { }

  getReviewHistory(): Review[] {
    return [
      {
        refNo: '20012/12/124', desc: 'Visit for minor headache', drId: 'dr1', patientId: 'pa1', lastReviewDate: new Date(),
        notes: [
          {
            recId: 'note1', rxNote: 'treated for headache asked to get lab test for other details, need to examin for eye',
            refNumber: '20012/12/124', metadata: { createdBy: 'gk', created_on: new Date(), version: 1, updatedBy: 'gk', updated_on: new Date() }
          },{
            recId: 'note2', rxNote: 'eye report reviewd, no issue found and suggested good sleeping',
            refNumber: '20012/12/124', metadata: { createdBy: 'gk', created_on: new Date(), version: 1, updatedBy: 'gk', updated_on: new Date() }
          }
        ], metadata: { createdBy: 'gk', created_on: new Date(), version: 1, updatedBy: 'gk', updated_on: new Date() }
      },
      {
        refNo: '20012/12/125', desc: 'Visit for body pain', drId: 'dr1', patientId: 'pa1', lastReviewDate: new Date(),
        notes: [
          {
            recId: 'note1', rxNote: 'treated for headache asked to get lab test for other details, need to examin for eye',
            refNumber: '20012/12/125', metadata: { createdBy: 'gk', created_on: new Date(), version: 1, updatedBy: 'gk', updated_on: new Date() }
          }
        ], metadata: { createdBy: 'gk', created_on: new Date(), version: 1, updatedBy: 'gk', updated_on: new Date() }
      }
    ]
  }
}



