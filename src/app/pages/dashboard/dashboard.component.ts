import { Component, OnInit } from '@angular/core';
import { DashPoints, BeeNotification, DashboardService, TransData } from 'bee-lib';
import { MenuItem } from 'primeng/api';
import { EChartOption } from 'echarts';

export interface DailyMed {
  med;
  afterFood;
  morningQty;
  afternoongQty;
  eveninggQty;
  medType;
  medNotes;
}

const data = [["2000-06-05", 101], ["2000-06-06", 100], ["2000-07-24", 80], ["2000-06-07", 100.5], ["2000-06-08", 86], ["2000-06-09", 91],
["2000-06-10", 85], ["2000-06-11", 83], ["2000-06-12", 88],
["2000-06-13", 92], ["2000-06-14", 103.10], ["2000-06-15", 102.45], ["2000-06-16", 103.9], ["2000-06-17", 101.5],
["2000-06-18", 101.1], ["2000-06-19", 93.9], ["2000-06-20", 96.9], ["2000-06-21", 103.7], ["2000-06-22", 102.8],
["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93],
["2000-06-29", 85], ["2000-06-30", 83], ["2000-07-01", 83], ["2000-07-02", 102.5], ["2000-07-03", 101.7], ["2000-07-04", 82],
["2000-07-05", 84], ["2000-07-06", 92], ["2000-07-07", 101.6], ["2000-07-08", 100.7], ["2000-07-09", 86], ["2000-07-10", 91],
["2000-07-11", 92], ["2000-07-12", 101.3], ["2000-07-13", 100.7], ["2000-07-14", 103.1], ["2000-07-15", 101.1], ["2000-07-16", 94],
["2000-07-17", 99], ["2000-07-18", 101.8], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 101.1], ["2000-07-22", 97], ["2000-07-23", 95]];

var dateList = data.map(function (item) {
  return item[0];
});
var valueList = data.map(function (item) {
  return item[1];
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  chartOption: EChartOption;

  dms: DailyMed[];
  notifi: BeeNotification[];
  selectedNotifi: BeeNotification;
  notidlg: boolean;
  mgntMenuItems: MenuItem[];
  miscMenuItems: MenuItem[];
  checked1: boolean = false;

  constructor(private dashboardService: DashboardService, ) {
    dashboardService.getNotification().then(res => this.notifi = res);
    this.mgntMenuItems = [
      { label: 'Consents', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/sharepts'] },
      { separator: true },
      { label: 'Health Records', icon: 'pi pi-fw pi-inbox', routerLink: ['/pages/encash'] }

    ];
    this.miscMenuItems = [
      { label: 'Notifications ', icon: 'pi pi-fw pi-bell', routerLink: ['/pages/encash'] },
      { label: 'Export/Report', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/sharepts'] },
      { separator: true },
      { label: 'My Appointments', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/encash'] },
      { label: 'Set Reminder ', icon: 'pi pi-fw pi-clock', routerLink: ['/pages/encash'] }
    ];
    this.getTempChart();
  }
  ngOnInit() {
    this.notidlg = false;

    this.selectedNotifi = new BeeNotification();
    this.dms = [
      { med: 'paracetamol', afterFood: 'Y', morningQty: 1, afternoongQty: 0, eveninggQty: 1, medType: 'C', medNotes: 'water mix' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'I', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'N', morningQty: 0, afternoongQty: 1, eveninggQty: 0, medType: 'T', medNotes: 'if b/w30&50' },
      { med: 'dolo-23-25ml', afterFood: 'Y', morningQty: 0, afternoongQty: 0, eveninggQty: 1, medType: 'O', medNotes: 'if b/w30&50' }
    ];

  }


  selectMsg(e, bmsg: BeeNotification): boolean {
    this.selectedNotifi = bmsg;
    this.notidlg = true;
    let tempMsg: BeeNotification = bmsg;
    tempMsg.msgId = bmsg.msgId;
    this.dashboardService.setMsgRead(tempMsg)
      .then(res => {
        bmsg.mread = res.mread;
      })
      .catch(err => {
        bmsg.mread = false;
      })
    return false;
  }

  deleteMsg(e, msg: BeeNotification): boolean {
    this.notidlg = false;
    console.debug("err start");
    this.dashboardService.setMsgDeleted(msg.msgId)
      .then((res) => {
        this.notifi.splice(this.notifi.indexOf(msg), 1);

        this.selectedNotifi = new BeeNotification();
      })
      .catch(err => {
        console.debug("err", err);
        return false;
      })
    return true;
  }

  switchBar(ty: string) {
    return //this.dashboardService.getPointAccruvel(ty).then(res => this.barData = res);
  }
  getTempChart() {
    this.chartOption =
    {
      visualMap: [{
        show: false,
        type: 'piecewise',
        precision: 2,
        pieces: [
          {
            min: 102,
            color: 'red',
            label: 'value（>=17）'
          }, {
            min: 98,
            max: 102,
            color: 'green',
            label: 'value （11  ~ 17 ）'
          }, {
            max: 98,
            color: 'red',
            label: 'value（11 ）'
          }]
      }],
      title: {
        subtext: 'Temperature'
      },
      tooltip: {
        trigger: 'axis',

      },
      toolbox: {
        left: 'center',
        itemSize: 15,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            title: {
              zoom: 'zoom',
              back: 'back',

            }
          },
          restore: { title: 'Refresh' },
          magicType: {
            type: ['line', 'bar'],
            title: { line: 'Line', bar: 'Bar' },
            saveAsImage: { title: 'Save' },
          },
        }
      },
      xAxis: [
        {
          data: dateList,
          axisLabel: {
            interval: 2,
            rotate: 70,
            fontSize: 8
          }
        },
        {
          gridIndex: 1
        }],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            formatter: '{value} °C',
            fontSize: 9
          },
          min: 95,
          max: 110,
        }, {
          splitLine: { show: true },
          gridIndex: 1
        }],
      grid: [{
        bottom: '20%'
      }, {
        top: '100%'
      },
      { height: 200 }
      ],
      /*dataZoom: [
         //{yAxisIndex:[0,2],start:90,end:110},
         {xAxisIndex:[0,1]},
         
      ],*/
      series: [
        {
          type: 'line',
          showSymbol: true,
          data: valueList
        },
      ],
    };
  }
  getBPChart() {
    var bpChartOption: EChartOption = {
      title: {
        subtext: 'Pressure'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        left: 'center',
        itemSize: 15,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            title: {
              zoom: 'zoom',
              back: 'back',

            }
          },
          restore: { title: 'Refresh' },
          magicType: {
            type: ['line', 'bar'],
            title: { line: 'Line', bar: 'Bar' },
            saveAsImage: { title: 'Save' },
          },
        }
     
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
        axisLabel: {
          interval: 1,
          rotate: 70,
          fontSize: 8
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          interval: 1,
          fontSize: 8
        }
      },
      series: [
        {
          name: 'Systolic',
          type: 'line',
          data: [110, 110, 105, 130, 120, 130, 110],
          markPoint: {
            data: [
              { type: 'max', name: 'max' },
              { type: 'min', name: 'min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'average' }
            ]
          }
        },
        {
          name: 'Diastolic',
          type: 'line',
          data: [80, 82, 72, 85, 83, 82, 50],
          markPoint: {
            data: [
              { type: 'max', name: 'max' },
              { type: 'min', name: 'min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'average' }
            ]
          }
        }
      ]
    }
    this.chartOption = bpChartOption;
  }

  getDiabeticChart() {
    var bpChartOption: EChartOption = {
      title: {
        subtext: 'Pressure'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        left: 'center',
        itemSize: 15,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            title: {
              zoom: 'zoom',
              back: 'back',

            }
          },
          restore: { title: 'Refresh' },
          magicType: {
            type: ['line', 'bar'],
            title: { line: 'Line', bar: 'Bar' },
            saveAsImage: { title: 'Save' },
          },
        }
     
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        
        data: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
        axisLabel: {
          interval: 1,
          rotate: 70,
          fontSize: 8,
          color:'yellow'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          interval: 1,
          fontSize: 8
        }
      },
      series: [
        {
          name: 'Systolic',
          type: 'line',
          lineStyle:{
            color:'#019'
        },
          data: [110, 110, 105, 130, 120, 130, 110],          
          markPoint: {
            itemStyle:{
              color:'#019'
            },
            data: [
              { type: 'max', name: 'max' },
              { type: 'min', name: 'min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'average' }
            ]
          }
        },
        {
          name: 'Diastolic',
          type: 'line',
          lineStyle:{
            color:'#f18',
            
        }, 
          data: [80, 82, 72, 85, 83, 82, 50],
          markPoint: {
            itemStyle:{
              color:'#f16'
            },
            data: [
              { type: 'max', name: 'max' },
              { type: 'min', name: 'min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'average' }
            ]
          }
        }
      ]
    }
    this.chartOption = bpChartOption;
  }
}
