import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-drehr',
  templateUrl: './drehr.component.html',
  styleUrls: ['./drehr.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrehrComponent  implements OnInit {
  reffNo: string;
  ehrType:string="smryEhr";

  constructor() { 
   
  }


  ngOnInit(): void {
    
  }
  
  @Input()
  public set reviewRef(reviewRef:string){
    this.reffNo=reviewRef;
  }
  
}
