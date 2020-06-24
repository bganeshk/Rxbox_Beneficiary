import { Component, OnInit } from '@angular/core';
import { DashPoints, BeeNotification, DashboardService, TransData } from 'bee-lib';
import { MenuItem } from 'primeng/api';
import { EChartOption } from 'echarts';
import { DailyMed, MetadataService } from 'src/app/global/metadata.service';



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

  constructor(private dashboardService: DashboardService, private mdataSrvs:MetadataService) {
    dashboardService.getNotification().then(res => this.notifi = res);
    this.mgntMenuItems = [
      { label: 'Consents', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/mgntConsent'] },
      { separator: true },
      { label: 'Health Records', icon: 'pi pi-fw pi-inbox', routerLink: ['/pages/mgntEHR'] }

    ];
    this.miscMenuItems = [
      { label: 'Notifications ', icon: 'pi pi-fw pi-bell', routerLink: ['/pages/mgntNotification'] },
      { label: 'Export/Report', icon: 'pi pi-fw pi-tags', routerLink: ['/reports'] },
      { separator: true },
      { label: 'My Appointments', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/appointmnt'] },
      { label: 'Set Reminder ', icon: 'pi pi-fw pi-clock', routerLink: ['/pages/reminder'] }
    ];
    this.getTempChart();
  }
  ngOnInit() {
    this.notidlg = false;

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


}
var data0 = splitData([
  ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
  ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
  ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
  ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
  ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
  ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
  ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
  ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
  ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
  ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
  ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
  ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
  ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
  ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
  ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
  ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
  ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
  ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
  ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
  ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
  ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
  ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
  ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
  ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
  ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
  ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
  ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
  ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
  ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
  ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
  ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
  ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
  ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
  ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
  ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
  ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
  ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
  ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
  ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
  ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
  ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
  ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
  ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
  ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
  ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
  ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
  ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
  ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
  ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
  ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
  ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
  ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
  ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
  ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
  ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
  ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
  ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
  ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
  ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
  ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
  ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
  ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
  ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
  ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
  ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
  ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
  ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
  ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
  ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
  ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
  ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
  ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
  ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
  ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
  ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
  ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
  ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
  ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
  ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
  ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
  ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
  ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
  ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
  ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
  ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
  ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
  ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
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
    result.push(sum / dayCount);
  }
  return result;
}
