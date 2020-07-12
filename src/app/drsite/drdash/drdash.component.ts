import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
 
@Component({
  selector: 'app-drdash',
  
  templateUrl: './drdash.component.html',
  styleUrls: ['./drdash.component.css']
})
export class DrdashComponent implements OnInit {

  customerId:string;
  


  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  selectCutomer(e){
    this.customerId=e;
    console.debug(this.customerId,e);
  }

}
