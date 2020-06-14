import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mgnt-template',
  templateUrl: './mgnt-template.component.html',
  styleUrls: ['./mgnt-template.component.css']
})
export class MgntTemplateComponent implements OnInit {

  visibilty:Map<string, boolean>;
  constructor() { }

  ngOnInit() {
    this.visibilty= new Map();
  }

  setVisibility(rec:string){
    console.debug(rec, this.visibilty.get(rec));
    if(this.visibilty.get(rec)){
      this.visibilty.set(rec,false);
    }else{
      this.visibilty.set(rec,true);
    }
  }
}
