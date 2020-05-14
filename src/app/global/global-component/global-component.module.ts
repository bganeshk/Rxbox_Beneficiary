import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

const IMPORT_PRIME_MODULE = [
];

const IMPORT_ANG_MODULE = [
  FormsModule, ReactiveFormsModule,SidebarModule,
  ButtonModule, InputTextModule, TableModule, DialogModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,...IMPORT_PRIME_MODULE, ...IMPORT_ANG_MODULE,    
  ],
  exports: [ CommonModule, ...IMPORT_PRIME_MODULE, ...IMPORT_ANG_MODULE]
})
export class GlobalComponentModule { }

