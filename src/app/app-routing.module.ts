import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserloginComponent } from './userlogin/userlogin.component';
 

const routes: Routes = [
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  { path: 'user_reg',component:UserRegistrationComponent},
  { path: 'login',component:UserloginComponent},
  { path: 'reports', loadChildren: './rxreport/rxreport.module#RxreportModule' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];
const config: ExtraOptions = {
  useHash: true,
  enableTracing: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
