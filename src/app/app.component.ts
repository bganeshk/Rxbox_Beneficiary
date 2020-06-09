import { Component, OnInit, Inject } from '@angular/core';
import { GlobalBeeService } from 'bee-lib';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalBeeService]
})
export class AppComponent implements OnInit {
  title = 'Rxbox-Beneficiary';
  visibleSideMenu: boolean;
  visiblefull: boolean;
  date = new Date();
  myTemplate: any = "";
  private env;
  items: MenuItem[];
  ngOnInit() {
    this.items = this.getMenuItems();


  }

  constructor(private gsrv: GlobalBeeService, @Inject('environment') environment) {
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
              routerLink: '/pages/mgntconsentsreq',
              
            },
            { separator: true },
            {
              label: 'Active', icon: 'pi pi-fw pi-check',
              queryParams: { status: 'active' },
              routerLink: '/pages/consentdetails'
            },{
              label: 'Expired', icon: 'pi pi-fw pi-spinner',
              queryParams: { status: 'expired' },
              routerLink: '/pages/consentdetails'
            },
          ]
        },
        {
          label: 'Consent Requests',
          items: [
            {
              label: 'Approved', icon: 'pi pi-fw pi-check',
              routerLink: '/pages/mgntconsentsreq',
              queryParams:{status:'appr'}
            },
            { separator: true },
            {
              label: 'Rejected', icon: 'pi pi-fw pi-times',
              routerLink: '/pages/mgntconsentsreq',
              queryParams:{status:'rej'}
            },
            {
              label: 'Expired', icon: 'pi pi-fw pi-spinner',
              routerLink: '/pages/mgntconsentsreq',
              queryParams:{status:'exp'}
            },
          ]
        },
        {
          label: 'Consent Templates',
          items: [
            { label: 'Generic', icon: 'pi pi-fw pi-ellipsis-v',routerLink:'/pages/mgnttemplate',queryParams:{type:'generic'} },
            { label: 'Public', icon: 'pi pi-fw pi-ellipsis-h',routerLink:'/pages/mgnttemplate',queryParams:{type:'public'} },
            { label: 'Custom', icon: 'pi pi-fw pi-filter',routerLink:'/pages/mgnttemplate',queryParams:{type:'custom'} },
          ]
        }
        ]
      },
      {
        label: 'Prescription',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          { label: 'My Priscription', icon: 'pi pi-fw pi-user',routerLink:'/presc', },
          //{ label: 'New/Create', icon: 'pi pi-fw pi-plus', routerLink:'/presc/',},
          { separator: true },
          { label: 'Fullfillment details', icon: 'pi pi-angle-double-right', routerLink:'/presc/ffmnt' }
        ]
      },
      {
        label: 'Health Records',
        //:'show all the active consent allow the user to revoke and modify the consent
        //shoud have search at the top and then after select a praticular consent for editing or inline revoke',
        icon: 'pi pi-pw pi-file-o',
        items: [{
          label: 'Manage',
          routerLink:'/ehr',
          //manage the consent template for assight the perisison to a doctor
          //ex: diabetic template and select what are the attributes possible in that template
          //add right to add new records
          //set default expiry in days 

          items: [

            { label: 'General Records', icon: 'pi pi-fw pi-user-plus',
              routerLink:'/ehr', queryParams:{type:'gen'}
           },
            { label: 'Public Records', icon: 'pi pi-fw pi-user-minus',
            routerLink:'/ehr', queryParams:{type:'pub'} },
          ]
        },

        { separator: true },
        { label: 'Family Records', icon: 'pi pi-fw pi-users',
        routerLink:'/ehr/family' },
        {
          label: 'Lab Records',
          routerLink:'/ehr/lab',
          items: [
            { label: 'Diaganosis Req:', icon: 'pi pi-fw pi-search',routerLink:'/ehr/lab' },
            { label: 'Add/Update Data', icon: 'pi pi-fw pi-pencil',routerLink:'/ehr/mgntdiarec' }
          ]
        },

        { label: 'Summary Records', icon: 'pi pi-fw pi-folder',routerLink:'/ehr/smrrec' },
        { label: 'Other docs', icon: 'pi pi-fw pi-paperclip',routerLink:'/ehr/otrdoc' }
        ]
      },
      {
        label: 'Others', icon: 'pi-list',
        items: [
          { label: 'Appointments', icon: 'pi pi-calendar-plus',routerLink:'/misc', },
          { label: 'Reminder', icon: 'pi pi-clock', routerLink:'/misc/reminder', },
          { separator: true },
          { label: 'Health Events', icon: 'pi pi-tag', routerLink:'/misc/ehevnt', },
          { label: 'Health roadmap', icon: 'pi pi-chart-bar',routerLink:'/misc/ehrmap', }
        ]
      }];
    return items;
  }
}
