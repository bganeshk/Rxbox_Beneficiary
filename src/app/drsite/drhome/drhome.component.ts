import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DrViewdataService, Review} from '../../global/dr-viewdata.service';
import { MessageService } from 'primeng/api';
import { constructor } from 'echarts';

@Component({
  selector: 'app-drhome',
  templateUrl: './drhome.component.html',
  styleUrls: ['./drhome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrhomeComponent implements OnInit {

  reviewDetails:Review[]
  selectedReviewDetails:Review;
  @Output() onReviewSelect= new EventEmitter<string>();

  constructor(private drViewSrvs: DrViewdataService, private messageService: MessageService) {
    
  }

  ngOnInit(): void {
    this.reviewDetails=this.drViewSrvs.getReviewHistory();
  }

  onReviewRowSelect(){
    this.onReviewSelect.emit(this.selectedReviewDetails.refNo);
  }
  addNewReviewData(){

  }
  onDelete(dm:Review){

  }
  onEdit(dm:Review){
    
  }
}
