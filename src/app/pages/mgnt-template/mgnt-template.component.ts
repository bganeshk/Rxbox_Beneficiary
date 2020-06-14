import { Component, OnInit } from '@angular/core';
import { MetadataService, HealthType } from 'src/app/global/metadata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mgnt-template',
  templateUrl: './mgnt-template.component.html',
  styleUrls: ['./mgnt-template.component.css']
})

export class MgntTemplateComponent implements OnInit {
  healthType:HealthType[]
  mnuType:string;

  visibilty:Map<string, boolean>;
  constructor(private mdtSrvs:MetadataService, 
    private messageService: MessageService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.visibilty= new Map();
    this.healthType=this.mdtSrvs.getHealthType();
    this.mnuType=this.route.snapshot.data['status'];
    console.debug(this.mnuType);
  }

  setVisibility(rec:string){
    console.debug(rec, this.visibilty.get(rec));
    if(this.visibilty.get(rec)){
      this.visibilty.set(rec,false);
    }else{
      this.visibilty.set(rec,true);
    }
    this.messageService.add({severity:'info', summary:'Visibiliy Updated', detail:'Visibiliy setting has been updated successfully'});

  }
}

