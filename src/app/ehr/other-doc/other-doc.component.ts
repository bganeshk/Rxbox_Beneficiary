import { Component, OnInit } from '@angular/core';
import { HealthRec, MetadataService } from 'src/app/global/metadata.service';
import { MessageService, MenuItem } from 'primeng/api';
import {TreeNode} from 'primeng/api';
import {TreeDragDropService} from 'primeng/api';

@Component({
  selector: 'app-other-doc',
  templateUrl: './other-doc.component.html',
  styleUrls: ['./other-doc.component.css'],
  providers:[TreeDragDropService]
})
export class OtherDocComponent implements OnInit {

  
  otherDocs: TreeNode[];
  selectedFile: TreeNode;
  items: MenuItem[];


  
  constructor(private mdataSrvs: MetadataService, private messageService: MessageService,
              private dragDropSrv:TreeDragDropService) { }

  ngOnInit() {
    this.items = [
      {label: 'Add New', icon: 'pi pi-plus', command: (event) => this.addFolder(this.selectedFile)},
      {label: 'Delete', icon: 'pi pi-trash', command: (event) => this.deleteFolder(this.selectedFile)}
  ];

    let hfolder={
      "data": 
      [
          {
              "label": "Documents 100",
              "data": {lbl:"Documents Folder",Id:100},
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [{
                      "label": "Check-up Results 110",
                      "data": {lbl:"Work Folder",Id:110},
                      "expandedIcon": "pi pi-folder-open",
                      "collapsedIcon": "pi pi-folder",
                      "children": [{"label": "Expenses.doc", "icon": "pi pi-file", "data": {lbl:"Expenses Document",Id:111}}, 
                      {"label": "Resume.doc", "icon": "pi pi-file", "data": {lbl:"Resume Document",Id:112}}]
                  },
                  {
                      "label": "Diganosis Report 120",
                      "data": {lbl:"Home Folder",Id:120},
                      "expandedIcon": "pi pi-folder-open",
                      "collapsedIcon": "pi pi-folder",
                      "children": [{"label": "Invoices.txt", "icon": "pi pi-file", "data": {lbl:"Invoices for this month",Id:121}}]
                  }]
          },
          {
              "label": "Scanning 200",
              "data": {lbl:"Movies Folder",Id:200},
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [{
                      "label": "MRI 210",
                      "data": {lbl:"Pacino Movies",Id:210},
                      "children": [{"label": "Scarface", "icon": "pi pi-video", "data": {lbl:"Scarface Movie",Id:211}}, 
                                   {"label": "Serpico", "icon": "pi pi-video", "data": {lbl:"Serpico Movie",Id:212}}]
                  },
                  {
                      "label": "X-Ray 220",
                      "data": {lbl:"De Niro Movies",Id:220},
                      "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": {lbl:"Goodfellas Movie",Id:221}},
                                   {"label": "Untouchables", "icon": "pi pi-video", "data":{lbl: "Untouchables Movie",Id:222}}]
                  }]
          },
          {
              "label": "Other Reports 300",
              "data": {lbl:"Pictures Folder",Id:300},
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [
                  {"label": "barcelona.jpg", "icon": "pi pi-image", "data":{lbl: "Barcelona Photo",Id:311}},
                  {"label": "logo.jpg", "icon": "pi pi-image", "data": {lbl:"PrimeFaces Logo",Id:312}},
                  {"label": "primeui.png", "icon": "pi pi-image", "data": {lbl:"PrimeUI Logo",Id:313}}]
          }
      ]
    }
    this.otherDocs=hfolder.data;
  }

  deleteFolder(pnode: TreeNode): void {
    

  }

  addFolder(selectedFile: TreeNode): void {
   
  }

  nodeSelect(e) {
    let index = e.node.data.Id;
    let i1 = (Math.floor(index / 100) - 1);
    let i2 = (Math.floor(index / 110) - 1)
    let i3 = (Math.floor(index / 111) - 1)

    console.debug(index, i1, i2, i3);
    if (i2 < 0 && i3 < 0) {
      console.debug(this.otherDocs[i1]);
    } else if (i3 < 0) {
      console.debug('i3 is zero',this.otherDocs[i1].children[i2]);
    }else{
      console.debug('i3 is zero',this.otherDocs[i1].children[i2].children[i3]);
    }
  }

}
