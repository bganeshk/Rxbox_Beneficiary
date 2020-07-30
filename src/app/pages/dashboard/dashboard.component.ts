import { Component, OnInit } from '@angular/core';
import {   GlobalBeeService } from 'cmn-lib';
import { BeeNotification, DashboardService } from 'rx-lib';
import { MenuItem } from 'primeng/api';

import { EChartOption } from 'echarts';
import { DailyMed, MetadataService } from 'src/app/global/metadata.service';
import { OverlayPanel } from 'primeng/overlaypanel';



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
  overlaypanelContent:string;
  dms: DailyMed[];
  notifi: BeeNotification[];
  selectedNotifi: BeeNotification;
  notidlg: boolean;
  mgntMenuItems: MenuItem[];
  miscMenuItems: MenuItem[];
  checked1: boolean = false;
  drView:boolean;

  constructor(private dashboardService: DashboardService, private beeSrvs:GlobalBeeService,
    private mdataSrvs:MetadataService) {
    dashboardService.getNotification().then(res => this.notifi = res);
    this.mgntMenuItems = [
      { label: 'Consents', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/mgntConsent'] },
      { separator: true },
      { label: 'Health Records', icon: 'pi pi-fw pi-inbox', routerLink: ['/ehr'] }

    ];
    this.miscMenuItems = [
      { label: 'Settings ', icon: 'pi pi-fw pi-cog', routerLink: ['/misc/security'] },
      { label: 'Export/Report', icon: 'pi pi-fw pi-tags', routerLink: ['/reports'] },
      { separator: true },
      { label: 'My Appointments', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/misc/appointment']},
      { label: 'Set Reminder ', icon: 'pi pi-fw pi-clock', routerLink: ['/misc'] }
    ];
    this.getTempChart();
  }
  ngOnInit() {
    this.notidlg = false;
    if('dash'===this.beeSrvs.getCurrentPage()){
      this.drView=true;
    }
    this.selectedNotifi = new BeeNotification();
    this.dms = this.mdataSrvs.getDailyMed();
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
      legend: {
        data: ["Dias..", "Sys.."],
        align: "left"
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        left: 'right',
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
        },
        min: 30
      },
      series: [
        {
          name: 'Sys..',
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
          name: 'Dias..',
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
        subtext: 'Blood Sugar'
      },
      legend: {
        data: ['BF', 'AF']
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        left: 'right',
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
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          interval: 1,
          fontSize: 8
        },
        min: 20
      },
      series: [
        {
          name: 'AF',
          type: 'line',
          lineStyle: {
            color: '#019'
          },
          data: [110, 110, 105, 130, 120, 130, 110],
          markPoint: {
            itemStyle: {
              color: '#019'
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
          name: 'BF',
          type: 'line',
          lineStyle: {
            color: '#f18',

          },
          data: [80, 82, 72, 85, 83, 82, 50],
          markPoint: {
            itemStyle: {
              color: '#f16'
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
  getPulseChart() {
    var puChartOption: EChartOption = {

      title: {
        text: 'Pulse',
        left: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
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
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        data: data0.categoryData,
        show: false
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      series: [

        {
          name: 'Pulse',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        }
      ]

    }
    this.chartOption = puChartOption;
  }

  showHealthHigh(event,type:string,overlaypanel: OverlayPanel){
    overlaypanel.toggle(event);
    this.overlaypanelContent="Content realted to "+type+" care health highlights and lowlights shall be displayed. Right now system could not find the details realted to the care provided or treatment realted to the subject. "    
  }
}
var data0 = splitData([
  ['2013/1/24', 72.26, 72.26, 77.3, 76.94],
  ['2013/1/25', 72, 73.3, 76.26, 76.38],
  ['2013/1/28', 75.35, 75.5, 75.35, 75.92],
  ['2013/1/29', 76.22, 78.98, 78.35, 78.8],
  ['2013/1/30', 78.75, 78.48, 76.89, 78.76],
  ['2013/1/31', 78.43, 78.42, 73.23, 79.82],
  ['2013/2/1', 73.41, 71.02, 79.57, 72.15],
  ['2013/2/4', 72.92, 72.15, 71.58, 79.38],
  ['2013/2/5', 71, 76.13, 70.3, 77.42],
  ['2013/2/6', 76.68, 76.48, 72.7, 79.73],
  ['2013/2/7', 76.69, 71.53, 79.22, 76.89],
  ['2013/2/8', 71.62, 76.4, 71.4, 79.03],
  ['2013/2/18', 79.91, 72.56, 71.43, 79.8],
  ['2013/2/19', 72.26, 78.91, 73.53, 72.07],
  ['2013/2/20', 78.49, 79.18, 73.61, 79.94],
  ['2013/2/21', 73.82, 72.95, 80.17, 73.82],
  ['2013/2/22', 72.94, 71.16, 76.76, 73.88],
  ['2013/2/25', 72.62, 72.82, 71.01, 73.78],
  ['2013/2/26', 71.76, 79.34, 79.89, 76.71],
  ['2013/2/27', 79.77, 71.22, 79.03, 72.63],
  ['2013/2/28', 72.32, 78.59, 76.92, 78.16],
  ['2013/3/1', 78.54, 75.51, 73.86, 79.65],
  ['2013/3/4', 73.08, 77.4, 75.25, 73.54],
  ['2013/3/5', 77.81, 72.31, 77.1, 72.14],
  ['2013/3/6', 73.61, 76.18, 72.6, 75.44],
  ['2013/3/7', 76.44, 72.29, 80.27, 75.02],
  ['2013/3/8', 72.42, 71.61, 71.59, 73.67],
  ['2013/3/11', 71.68, 71.59, 79.58, 72.96],
  ['2013/3/12', 80.16, 79.6, 76.83, 73.29],
  ['2013/3/13', 79.17, 76.97, 75.25, 79.33],
  ['2013/3/14', 75.77, 77.28, 75.31, 77.22],
  ['2013/3/15', 76.31, 79.4, 75, 71.08],
  ['2013/3/18', 77.29, 74.02, 79.21, 77.05],
  ['2013/3/19', 79.26, 75.43, 72.02, 76.31],
  ['2013/3/20', 75.76, 71.37, 75.42, 71.86],
  ['2013/3/21', 71.21, 72.24, 71.6, 73.81],
  ['2013/3/22', 72.4, 72.28, 71.97, 73],
  ['2013/3/25', 73.76, 72.72, 71.91, 76.89],
  ['2013/3/26', 71.58, 79.67, 79.12, 71.99],
  ['2013/3/27', 79.38, 80.26, 79, 72.48],
  ['2013/3/28', 77.55, 78.3, 72.91, 77.55],
  ['2013/3/29', 78.49, 78.62, 79.81, 74.87],
  ['2013/4/1', 79.46, 76.4, 77.31, 76.95],
  ['2013/4/2', 76.9, 77.76, 70.44, 75.42],
  ['2013/4/3', 72.69, 75.29, 71.25, 71.34],
  ['2013/4/8', 79.24, 71.59, 78.67, 71.59],
  ['2013/4/9', 71.47, 75.77, 71.47, 76.73],
  ['2013/4/10', 74.93, 76.13, 71.56, 73.04],
  ['2013/4/11', 78.98, 71.55, 71.26, 72.48],
  ['2013/4/12', 71.09, 70.78, 70.44, 76.26],
  ['2013/4/15', 79.91, 78.94, 77.39, 70.99],
  ['2013/4/16', 76.63, 79.85, 76.78, 79.43],
  ['2013/4/17', 79.03, 79.8, 79.47, 79.51],
  ['2013/4/18', 78.82, 79.6, 77.44, 70.03],
  ['2013/4/19', 70.12, 79.64, 70.58, 75.11],
  ['2013/4/22', 78.4, 72.17, 72.26, 745.12],
  ['2013/4/23', 72.62, 78.54, 78.81, 72.62],
  ['2013/4/24', 787.35, 71.32, 78.11, 76.12],
  ['2013/4/25', 71.19, 79.31, 79.85, 74.63],
  ['2013/4/26', 70.89, 77.91, 77.86, 71.58],
  ['2013/5/2', 77.78, 77.12, 76.14, 78.65],
  ['2013/5/3', 78.05, 70.5, 78.05, 72.81],
  ['2013/5/6', 71.5, 71.17, 71.5, 78.07],
  ['2013/5/7', 77.86, 75.57, 71.44, 74.26],
  ['2013/5/8', 72.39, 74.3, 75.42, 75.21],
  ['2013/5/9', 74.96, 72.97, 71.38, 75.86],
  ['2013/5/10', 79.82, 74.83, 75.81, 75.67],
  ['2013/5/13', 75.68, 71.92, 71.36, 75.85],
  ['2013/5/14', 78.9, 71.01, 70.87, 79.93],
  ['2013/5/15', 71.09, 74.8, 71.58, 75.19],
  ['2013/5/16', 71.34, 75.81, 71.77, 75.87],
  ['2013/5/17', 79.81, 79.87, 74.41, 76.09],
  ['2013/5/20', 79.33, 79.99, 79.9, 80.39],
  ['2013/5/21', 79.11, 80.11, 79.12, 80.3],
  ['2013/5/22', 80.75, 80.4, 79.43, 71.18],
  ['2013/5/23', 79.81, 77.67, 77.1, 80.95],
  ['2013/5/24', 79.45, 76.53, 77.25, 79.59],
  ['2013/5/27', 79.66, 79.08, 79.94, 80.7],
  ['2013/5/28', 79.4, 72.32, 79.47, 72.1],
  ['2013/5/29', 72.54, 72.02, 72.17, 73.33],
  ['2013/5/30', 71.25, 71.75, 71.49, 72.72],
  ['2013/5/31', 72.76, 72.59, 79.37, 72.53],
  ['2013/6/3', 72.21, 79.25, 79.11, 71.43],
  ['2013/6/4', 79.1, 77.42, 76.76, 79.1],
  ['2013/6/5', 77.71, 77.93, 76.87, 77.86],
  ['2013/6/6', 76.43, 72.11, 74.07, 76.69],
  ['2013/6/7', 72.26, 71.9, 70.07, 75.63],
  ['2013/6/13', 79.1, 74.35, 76.22, 79.1]
]);


function splitData(rawData) {
  var categoryData = [];
  var values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  };
}

function calculateMA(dayCount) {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data0.values[i - j][1];
    }
    result.push((sum / dayCount).toFixed(3));
  }
  return result;
}
