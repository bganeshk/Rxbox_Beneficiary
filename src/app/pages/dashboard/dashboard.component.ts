import { Component, OnInit } from '@angular/core';
import { DashPoints, BeeNotification,DashboardService, TransData } from 'bee-lib';
import { MenuItem } from 'primeng/api';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [  DashboardService]
})
export class DashboardComponent implements OnInit {
  
  chartOption: EChartOption = { xAxis: {
    type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }, yAxis: {
    type: 'value'
  }, series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]}


  constructor(private dashboardService: DashboardService,) {
  }
  ngOnInit() {
     }
}
