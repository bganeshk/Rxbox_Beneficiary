import { Component, OnInit } from '@angular/core';
import { MedFullFillment, MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(){
    
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
