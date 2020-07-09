import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'presc', loadChildren: () => import('./prescription/prescription.module').then(m => m.PrescriptionModule) },
  { path: 'ehr', loadChildren: () => import('./ehr/ehr.module').then(m => m.EHRModule) },
  { path: 'misc', loadChildren: () => import('./misc/misc.module').then(m => m.MiscModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  { path: 'user_reg',component:UserRegistrationComponent},
  { path: 'login',component:UserloginComponent},
  { path: 'reports', loadChildren: () => import('./rxreport/rxreport.module').then(m => m.RxreportModule) },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];
const config: ExtraOptions = {
 // useHash: true,
 // enableTracing: true,
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
