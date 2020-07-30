import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {  MetadataService } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
import { RxNote } from 'rx-lib';

@Component({
  selector: 'app-drnotes',
  templateUrl: './drnotes.component.html',
  styleUrls: ['./drnotes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrnotesComponent implements OnInit {
  reffNo: string;
  rxNotes: RxNote[];
  newRxNote: RxNote;
  visibleDlg: boolean;

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.rxNotes = this.mdataSrvs.getRxNote();
  }

  @Input()
  public set reviewRef(reviewRef: string) {
    this.reffNo = reviewRef;
  }
  addNewNote() {
    this.visibleDlg = true;
    this.newRxNote = { recId: null, rxNote: '', refNumber: this.reffNo };
    this.messageService.clear();
  }
  editNote(nt:RxNote){
    this.newRxNote=nt;
    this.visibleDlg=true;
    this.messageService.clear();
    console.debug(nt);
  }

  blDlgCancel() {
    this.visibleDlg = false;
    this.messageService.clear();
  }
  blDlgSave() {
    this.visibleDlg = false;
    this.messageService.add({ sticky: false, severity: 'success', summary: 'Record Saved', detail: 'Record has been saved successfully' });
  }

}
