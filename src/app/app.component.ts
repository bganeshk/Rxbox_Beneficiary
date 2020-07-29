import { Component, OnInit, Inject } from '@angular/core';
import { GlobalBeeService, BeeNotification, DashboardService } from 'bee-lib';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalBeeService,DashboardService]
})
export class AppComponent implements OnInit {
  title = 'Rxbox-Beneficiary';
  visibleSideMenu: boolean;
  visiblefull: boolean;
  date = new Date();
  myTemplate: any = "";
  private env;
  newNoti:BeeNotification[];
  newMsg:BeeNotification[];
  newChat:BeeNotification[];
  items: MenuItem[];
  ngOnInit() {
    this.items = this.getMenuItems();
    this.dashboardService.getNotification().then(res => this.newNoti = res);

  }

  constructor(private gsrv: GlobalBeeService, @Inject('environment') environment,
  private dashboardService: DashboardService,) {
    this.env = environment;
    if (this.env.production) {
      //disable the debugs
      console.debug = function () { };
    }
  }
  getCurrentPage(): string {

    return this.gsrv.getCurrentPage();

  }
  getLogginStatus(): boolean {
    return (this.gsrv.isLoggedIn());
  }
  logout() {
    this.gsrv.logout();
  }

  getLoginName(): string {
    return this.gsrv.getLoginName();
  }

  getHelpHtmlContent() {
    this.myTemplate = "";
    this.gsrv.getHelpContent(this.getCurrentPage() + ".html").then(res => this.myTemplate = res);
  }

  getMenuItems(): MenuItem[] {
    var items: MenuItem[];
    items = [
      {
        label: 'Consents',
        //:'show all the active consent allow the user to revoke and modify the consent
        //shoud have search at the top and then after select a praticular consent for editing or inline revoke',
        icon: 'pi pi-pw pi-file', 
        items: [{
          label: 'Manage', expanded: true, routerLink: '/pages/mgntConsent',
          //manage the consent template for assight the perisison to a doctor
          //ex: diabetic template and select what are the attributes possible in that template
          //add right to add new records
          //set default expiry in days 

          items: [
            {
              label: 'Assign', icon: 'pi pi-fw pi-user-plus',              
              routerLink: '/pages/assignConsent',
              
            },
            { separator: true },
            {
              label: 'Active', icon: 'pi pi-fw pi-check',
              routerLink: '/pages/activeConsentdetails'
            },{
              label: 'Expired', icon: 'pi pi-fw pi-spinner',
              routerLink: '/pages/expConsentdetails'
            },
          ]
        },
        {
          label: 'Consent Requests',
           
          items: [
            {
              label: 'New', icon: 'pi pi-fw pi-arrow-circle-right',
              routerLink: '/pages/newConsentsReq',
            },
            { separator: true },
            {
              label: 'Approved', icon: 'pi pi-fw pi-check',
              routerLink: '/pages/approvedConsentsReq'
            },
            {
              label: 'Expired/Rejected', icon: 'pi pi-fw pi-spinner',              
              routerLink: '/pages/rejectedConsentsReq',
              queryParams:{status:'exp'}
            },
          ]
        },
        {
          label: 'Consent Templates',
          items: [
            { label: 'Public', icon: 'pi pi-fw pi-ellipsis-h',routerLink:'/pages/mgntPubTemplate',queryParams:{type:'public'} },
            { label: 'Generic', icon: 'pi pi-fw pi-ellipsis-v',routerLink:'/pages/mgntGenTemplate',queryParams:{type:'generic'} },            
            { label: 'Custom', icon: 'pi pi-fw pi-filter',routerLink:'/pages/mgntCustTemplate',queryParams:{type:'custom'} },
          ]
        }
        ]
      },
      {
        label: 'Prescription',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          { label: 'My Prescription', icon: 'pi pi-fw pi-user',routerLink:'/presc/mgmntpres', },
          //{ label: 'New/Create', icon: 'pi pi-fw pi-plus', routerLink:'/presc/',},
          { separator: true },
          { label: 'prescription History', icon: 'pi pi-chart-bar', routerLink:'/presc/prhs' },
          { label: 'Fullfillment details', icon: 'pi pi-angle-double-right', routerLink:'/presc/ffmnt' }
          
        ]
      },
      {
        label: 'Health Records',
        //:'show all the active consent allow the user to revoke and modify the consent
        //shoud have search at the top and then after select a praticular consent for editing or inline revoke',
        icon: 'pi pi-pw pi-file-o',
        items: [{
          label: 'Manage Record',
          routerLink:'/ehr',icon: 'pi pi-file',
          //manage the consent template for assight the perisison to a doctor
          //ex: diabetic template and select what are the attributes possible in that template
          //add right to add new records
          //set default expiry in days 
          /*--
          items: [
            { label: 'Public Records', icon: 'pi pi-fw pi-user-minus',
            routerLink:'/ehr', queryParams:{type:'pub'} },
            { label: 'General Records', icon: 'pi pi-fw pi-user-plus',
              routerLink:'/ehr', queryParams:{type:'gen'}
           },
          ] */
        },
        { separator: true },
        { label: 'Family Records', icon: 'pi pi-fw pi-users',
        routerLink:'/ehr/family' },
        {
          label: 'Lab Records',
          routerLink:'/ehr/lab',
          icon: 'pi pi-fw pi-pencil'
         /* items: [
            { label: 'Diaganosis Req:', icon: 'pi pi-fw pi-search',routerLink:'/ehr/lab' },
            { label: 'Add/Update Data', icon: 'pi pi-fw pi-pencil',routerLink:'/ehr/mgntdiarec' }
          ]*/
        },

        { label: 'Summary Records', icon: 'pi pi-fw pi-folder',routerLink:'/ehr/smrrec' },
        { label: 'Other docs', icon: 'pi pi-fw pi-paperclip',routerLink:'/ehr/otrdoc' }
        ]
      },
      {
        label: 'Others', icon: 'pi pi-list',
        items: [
          { label: 'Appointments', icon: 'pi pi-calendar-plus',routerLink:'/misc', },
          { label: 'Reminder', icon: 'pi pi-clock', routerLink:'/misc/reminder', },
          { separator: true },
          { label: 'Health Events', icon: 'pi pi-tag', routerLink:'../misc/ehevnt', },
          { label: 'Health roadmap', icon: 'pi pi-chart-bar',routerLink:'/misc/ehrmap', }
        ]
      }, {
        label: 'Settings', icon: 'pi pi-cog',
        items: [
          { label: 'profile', icon: 'pi pi-user',routerLink:'/profile', },
          { label: 'Notification', icon: 'pi pi-bell', routerLink:'/misc/reminder', },
          { separator: true },
          { label: 'Security', icon: 'pi pi-lock', routerLink:'/misc/security', }
           
        ]
      },{
        label: 'labview', icon: 'pi pi-cog',
        items: [
          { label: 'labdash', icon: 'pi pi-user',routerLink:'/lab/dash', },
          { label: 'Notification', icon: 'pi pi-bell', routerLink:'/misc/reminder', },
          { separator: true },
          { label: 'Security', icon: 'pi pi-lock', routerLink:'/misc/security', }
           
        ]
      },{
        label: 'medicos', icon: 'pi pi-cog',
        items: [
          { label: 'medidash', icon: 'pi pi-user',routerLink:'/medcos/dash', }           
        ]
      },{
        label: 'drview', icon: 'pi pi-cog',
        items: [
          { label: 'medidash', icon: 'pi pi-user',routerLink:'/drview/dash', }           
        ]
      }
    ];
    return items;
  }
}
