import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing/pages-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

const PAGES_ENTRY_COMPONENTS = [

];


@NgModule({
  declarations: [...PAGES_COMPONENTS, PagesComponent],
  entryComponents: [...PAGES_ENTRY_COMPONENTS],
  imports: [
    PagesRoutingModule, GlobalComponentModule
  ]
})
export class PagesModule { }
