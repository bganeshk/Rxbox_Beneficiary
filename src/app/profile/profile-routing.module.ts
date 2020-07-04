import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AddressComponent } from './address/address.component';
import { PrfnamedetComponent } from './prfnamedet/prfnamedet.component';
import { PrfpasswdComponent } from './prfpasswd/prfpasswd.component';
import { PymntComponent } from './pymnt/pymnt.component';
import { SupportComponent as SupportComponent } from './social/social.component';

 


const routes: Routes = [{
    path: '',
    component: ProfileComponent,
    children: [
        {
            path: 'address',
            component: AddressComponent
        },
        {
            path: '',
            component: PrfnamedetComponent
        },{
            path: 'prf',
            component: PrfnamedetComponent
        },
        {
            path: 'prfpasswd',
            component: PrfpasswdComponent
        },
        {
            path: 'paymnt',
            component: PymntComponent
        },
        {
            path: 'support',
            component: SupportComponent
        }
    ]
}];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
