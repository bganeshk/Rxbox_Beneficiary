import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DrViewdataService } from 'src/app/global/dr-viewdata.service';
import { MessageService } from 'primeng/api';
import { MetadataService, ConsntReq } from 'src/app/global/metadata.service';

@Component({
  selector: 'app-drconsent',
  templateUrl: './drconsent.component.html',
  styleUrls: ['./drconsent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrconsentComponent implements OnInit {
  myConsents:ConsntReq[]
  selectedConsent:ConsntReq;
  constructor(private drViewSrvs: DrViewdataService,private mdataSrvs: MetadataService,
     private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onEdit(e){

  }
  onDelete(e){


  }

  reqNewConsent(){

  }

  onRowSelect(){
    
  }
}
