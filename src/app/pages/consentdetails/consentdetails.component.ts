import { Component, OnInit } from '@angular/core';

import { MetadataService, } from 'src/app/global/metadata.service';
import { MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Consnt, ConsentService } from 'rx-lib';

@Component({
  selector: 'app-consentdetails',
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  templateUrl: './consentdetails.component.html',
  styleUrls: ['./consentdetails.component.css']
})
export class ConsentdetailsComponent implements OnInit {
  cosnts: Consnt[];
  cols: any[];
  cosnt_cat_type: SelectItem[];
  record_type: string;
  selectedCons: Consnt[];

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService,
    private route: ActivatedRoute, private consentSrvs: ConsentService,
    private router: Router) {
     
  }


  ngOnInit() {

    this.cols = [
      { field: 'cosnt_name', header: 'Consent Name' },
      { field: 'created', header: 'Created' },
      { field: 'validity', header: 'Valid' },
      { field: 'cosnt_tag', header: 'Tag(s)' },
      { field: 'cosnt_assignee', header: 'Assignee(s)' },
      { field: 'cosnt_cat_type', header: 'EHR Category' }
    ];
    this.consentSrvs.getUserConsents().then(res => {
      this.cosnts = res;
    });
    this. mdataSrvs.getJSONRef().then(res=>{
        this.cosnt_cat_type = this.mdataSrvs.getEhrCategoryList();
    })
    
    this.record_type = this.getParamValue('status');

  }

  getParamValue(parm: string) {
    return this.route.snapshot.data[parm];
  }

  revokeConsent() {
    if (this.selectedCons && this.selectedCons.length > 0) {
      let consentIds=this.selectedCons.map(e=>{
        return e.cons_id;
      })
     this.consentSrvs.revokeConsents(consentIds).then(e=>{
      this.messageService.add({ severity: 'success', summary: 'Consent Revoked', detail: 'Consent access has been revoked' });
     })
     .catch(err=>{
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Consent revokation has been failed' }); 
     });     
     
    } else {
      this.messageService.add({ severity: 'error', summary: 'Select Consent', detail: 'Consent is not selected' });

    }
  }
  exportPdf() {
    /*import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, this.cars);
            doc.save('primengTable.pdf');
        })
    })*/
  }

  exportExcel() {
    /*import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.get());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "primengTable");
    });**/
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    /*import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });**/
  }

}
