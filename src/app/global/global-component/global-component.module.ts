import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PanelMenuModule} from 'primeng/panelmenu';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';

const IMPORT_PRIME_MODULE = [
  MessagesModule,MessageModule,ScrollPanelModule,OverlayPanelModule,  ButtonModule,
   InputTextModule, TableModule, DialogModule, CardModule,SidebarModule,
   PanelMenuModule, FieldsetModule,MultiSelectModule, CalendarModule, ChipsModule,
   DataViewModule,DropdownModule,PanelModule
];

const IMPORT_ANG_MODULE = [
  FormsModule, ReactiveFormsModule,MatTooltipModule,
  MatIconModule, MatButtonModule,MatCheckboxModule
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,...IMPORT_PRIME_MODULE, ...IMPORT_ANG_MODULE,    
  ],
  exports: [ CommonModule, ...IMPORT_PRIME_MODULE, ...IMPORT_ANG_MODULE]
})
export class GlobalComponentModule { }

