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
          label: 'Manage', expanded: true,
          //manage the consent template for assight the perisison to a doctor
          //ex: diabetic template and select what are the attributes possible in that template
          //add right to add new records
          //set default expiry in days 

          items: [
            { label: 'Active', icon: 'pi pi-fw pi-user-plus' }, { separator: true },
            { label: 'Expired', icon: 'pi pi-fw pi-spinner' },
          ]
        },
        {
          label: 'Requests',
          items: [
            { label: 'Approved', icon: 'pi pi-fw pi-check' }, { separator: true },
            { label: 'Rejected', icon: 'pi pi-fw pi-times' },
            { label: 'Expired', icon: 'pi pi-fw pi-spinner' },
          ]
        },
        {
          label: 'Templates',
          items: [
            { label: 'Generic', icon: 'pi pi-fw pi-ellipsis-v' },
            { label: 'Public', icon: 'pi pi-fw pi-ellipsis-h' },
            { label: 'Custom', icon: 'pi pi-fw pi-filter' },
          ]
        }
        ]
      },
      {
        label: 'Prescription',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          { label: 'My Priscription', icon: 'pi pi-fw pi-user' },
          { label: 'New/Create', icon: 'pi pi-fw pi-plus' },
          { separator: true },
          { label: 'Fullfillment details', icon: 'pi pi-angle-double-right' }
        ]
      },
      {
        label: 'Health Records',
        //:'show all the active consent allow the user to revoke and modify the consent
        //shoud have search at the top and then after select a praticular consent for editing or inline revoke',
        icon: 'pi pi-pw pi-file-o',
        items: [{
          label: 'Manage',
          //manage the consent template for assight the perisison to a doctor
          //ex: diabetic template and select what are the attributes possible in that template
          //add right to add new records
          //set default expiry in days 

          items: [

            { label: 'General Records', icon: 'pi pi-fw pi-user-plus' },
            { label: 'Public Records', icon: 'pi pi-fw pi-user-minus' },

          ]
        },

        { separator: true },
        { label: 'Family Records', icon: 'pi pi-fw pi-users' },
        {
          label: 'Lab Records',
          items: [
            { label: 'Diaganosis Req:', icon: 'pi pi-fw pi-search' },
            { label: 'Add/Update Data', icon: 'pi pi-fw pi-pencil' }
          ]
        },

        { label: 'Summary Records', icon: 'pi pi-fw pi-folder' },
        { label: 'Other docs', icon: 'pi pi-fw pi-paperclip' }
        ]
      },
      {
        label: 'Others', icon: 'pi-list',
        items: [
          { label: 'Appointments', icon: 'pi pi-calendar-plus' },
          { label: 'Reminder', icon: 'pi pi-clock' },
          { separator: true },
          { label: 'Health Events', icon: 'pi pi-tag' },
          { label: 'Health roadmap', icon: 'pi pi-chart-bar' }
        ]
      }];
    return items;
  }
}
