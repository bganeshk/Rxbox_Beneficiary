import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {

  vflag:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public set video(vflag: boolean) {
    this.vflag = vflag;
  }
}
