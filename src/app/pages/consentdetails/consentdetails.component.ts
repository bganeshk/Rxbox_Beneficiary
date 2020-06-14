import { Component, OnInit } from '@angular/core';

import { MetadataService, Consnt } from 'src/app/global/metadata.service';
import { MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  cosnts:Consnt[];
  cols:any[];
  cosnt_cat_type:SelectItem[];
  record_type:string;
  selectedCons:Consnt[];
  
  constructor(private mdataSrvs:MetadataService, private messageService: MessageService,
    private route:ActivatedRoute,
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

  this.cosnts=[
    {cons_id:'id1',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id2',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id3',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id4',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id5',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id6',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id7',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id8',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id9',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id10',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id11',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id12',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id13',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true},
    {cons_id:'id14',cosnt_name:'nam2',cosnt_assignee:null,cosnt_tag:null,cosnt_cat_type:['Summary_Report','Lab_Report'],cosnt_type:null,cosnted_ehr:['Ehr_023243','Ehr_0232e43'],remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:'8',validity_unit:'days',is_active:true},
    {cons_id:'id15',cosnt_name:'nam1',cosnt_assignee:['gkumar1'],cosnt_tag:null,cosnt_cat_type:null,cosnt_type:null,cosnted_ehr:null,remarks:'cosnent is crated for the generic test for Dr.Rama',created:null,validity:null,validity_unit:null,is_active:true}
  ];
  this.cosnt_cat_type=this.mdataSrvs.getConsentCategoryList();
  this.record_type=this.getParamValue('status');
  
  console.debug(this.record_type);
  }

  getParamValue(parm:string) {
    return  this.route.snapshot.data[parm];
  }

  revokeConsent(){
    if(this.selectedCons && this.selectedCons.length>0){
      this.messageService.add({severity:'success', summary:'Consent Revoked', detail:'Consent access has been revoked'});
      console.error('method not implemented');      
    }else{
      this.messageService.add({severity:'error', summary:'Select Consent', detail:'Consent is not selected'});

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
