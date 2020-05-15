import { Component, OnInit } from '@angular/core';
import { DashPoints, BeeNotification,DashboardService, TransData } from 'bee-lib';
import {  } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [  DashboardService]
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  options2: any;
 
  barData: any;
  menuItems: MenuItem[];
  pointSummary:DashPoints;
  notifi:BeeNotification[];
  selectedNotifi:BeeNotification;
  notidlg:boolean;
  earnerTx:TransData[];
  getTx:TransData[];
  giveTx:TransData[];

  constructor(private dashboardService: DashboardService,) {
  }
  ngOnInit() {
     }
}
