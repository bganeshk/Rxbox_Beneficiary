import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pages',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  items1: MenuItem[];
  constructor() { }

  ngOnInit() {
    
  
    this.items1 = [
      {label: 'Profile', icon: 'pi pi-fw pi-user-edit',routerLink:"prf"},
      {label: 'Address Details', icon: 'pi pi-id-card',routerLink:"address"}, 
      {label: 'Password ', icon: 'pi pi-lock',routerLink:"prfpasswd"}, 
      {label: 'Digital Wallets', icon: 'pi pi-briefcase',routerLink:"paymnt"},  
      {label: 'Support', icon: 'pi pi-question',routerLink:"support"}
  ];
 }

}
