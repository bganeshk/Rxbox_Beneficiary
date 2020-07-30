import { Component, OnInit, Inject } from '@angular/core';
import {MessageService} from 'primeng/api';
import { GlobalBeeService } from 'cmn-lib';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers:[MessageService]
})
export class PagesComponent implements OnInit {

  visibleSideMenu:boolean;
  visiblefull:boolean;
  
  constructor(private gsrv:GlobalBeeService,@Inject('environment')  environment) { }

  ngOnInit() {
  }

  getCurrentPage():string{
    
    return this.gsrv.getCurrentPage();
  }
}
