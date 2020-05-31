import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';
import { GlobalComponentModule } from '../global/global-component/global-component.module';
import { RxreportComponent } from './rxreport/rxreport.component';


const REPORTS_COMPONENTS = [
  RxreportComponent
]

const REPORTS_ENTRY_COMPONENTS = [

];

@NgModule({
  declarations: [...REPORTS_COMPONENTS],
  entryComponents: [...REPORTS_ENTRY_COMPONENTS],  
  imports: [
    ReportsRoutingModule, GlobalComponentModule,
  ]
})
export class RxreportModule { }
