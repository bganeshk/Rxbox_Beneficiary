import { Component, OnInit } from '@angular/core';
import { DashPoints, BeeNotification, DashboardService, TransData } from 'bee-lib';
import { MenuItem } from 'primeng/api';


export interface DailyMed {
  med;
  afterFood;
  morningQty;
  afternoongQty;
  eveninggQty;
  medType;
  medNotes;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

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
      {label: 'Consents', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/sharepts']},
      { separator: true },
      {label: 'Health Records', icon: 'pi pi-fw pi-inbox', routerLink: ['/pages/encash']}
      
    ];
    this.miscMenuItems = [
      {label: 'Notifications ', icon: 'pi pi-fw pi-bell', routerLink: ['/pages/encash']},
      {label: 'Export/Report', icon: 'pi pi-fw pi-tags', routerLink: ['/pages/sharepts']},
      { separator: true },
      {label: 'My Appointments', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/encash']},
      {label: 'Set Reminder ', icon: 'pi pi-fw pi-clock', routerLink: ['/pages/encash']}
    ];
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
}
