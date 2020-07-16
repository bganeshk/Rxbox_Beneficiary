import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DrViewdataService, Review} from '../../global/dr-viewdata.service';
import { MessageService, SelectItem } from 'primeng/api';
import { constructor } from 'echarts';

@Component({
  selector: 'app-drhome',
  templateUrl: './drhome.component.html',
  styleUrls: ['./drhome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrhomeComponent implements OnInit {
  typeLst:SelectItem[]
  reviewDetails:Review[]
  newRecType:string;
  selectedReviewDetails:Review;
  @Output() onReviewSelect= new EventEmitter<string>();
  viewDlg: boolean;

  constructor(private drViewSrvs: DrViewdataService, private messageService: MessageService) {
    
  }

  ngOnInit(): void {
    this.reviewDetails=this.drViewSrvs.getReviewHistory();
    this.typeLst=[
      {label:'Review Appointment',value:'review_rec'},
      {label:'Hi-Low Entry',value:'hilow_rec'},
      {label:'Family Details',value:'family_rec'},
      {label:'Lifestyle Entry',value:'lifesty_rec'},
      {label:'Vaccinations',value:'vacnan'},      
      {label:'Summary Record',value:'summary_rec'},
      {label:'Other Docs',value:'odoc_rec'},
      
    ]
  }

  onReviewRowSelect(){
    this.onReviewSelect.emit(this.selectedReviewDetails.refNo);
  }
  addNewReviewData(){
    this.viewDlg=true;
  }
  onDelete(dm:Review){

  }
  onEdit(dm:Review){
    
  }
  saveNewRview(){
    this.viewDlg=false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
  }
}
