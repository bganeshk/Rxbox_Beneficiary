import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RxNote, MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-drnotes',
  templateUrl: './drnotes.component.html',
  styleUrls: ['./drnotes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrnotesComponent implements OnInit {
  reffNo: string;
  rxnotes:RxNote[];

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.rxnotes=this.mdataSrvs.getRxNote();
  }

  @Input()
  public set reviewRef(reviewRef:string){
    this.reffNo=reviewRef;
  }
}
