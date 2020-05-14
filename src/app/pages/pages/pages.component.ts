import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers:[MessageService]
})
export class PagesComponent implements OnInit {

  visibleSideMenu:boolean;
  visiblefull:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
