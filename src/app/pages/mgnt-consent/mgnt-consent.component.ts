import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MetadataService, } from 'src/app/global/metadata.service';
import { MessageService } from 'primeng/api';
import { Consnt, ConsentService } from 'rx-lib';
import { ProfileService, GlobalBeeService } from 'cmn-lib';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-mgnt-consent',
  templateUrl: './mgnt-consent.component.html',
  styleUrls: ['./mgnt-consent.component.css'],
  providers: [ConsentService, GlobalBeeService]
})
export class MgntConsentComponent implements OnInit {
  cosnt_type: SelectItem[];
  cosnt_cat_type: SelectItem[];
  valididty_unty: SelectItem[];  
  cosnt_name: string;
  cosnts: Consnt[];
  selectedCons: Consnt;
  cols: any[];
  displayDialog: boolean;
  displayEditDialog: boolean;
  consentForm: FormGroup;
  consentSerachForm: FormGroup;
  filteredTemplate: any;
  
  constructor(private mdataSrvs: MetadataService, private messageService: MessageService,
    private fb: FormBuilder,
    private gsrv: GlobalBeeService, private consentSrvs: ConsentService) { }

  ngOnInit() {
    this.mdataSrvs.getJSONRef().then(res => {
      this.cosnt_type = this.mdataSrvs.getConsentTypeList();
      this.cosnt_cat_type = this.mdataSrvs.getEhrCategoryList();
      this.valididty_unty = this.mdataSrvs.getConsentValidityUnit();
    });
    this.consentSrvs.getUserConsents().then(res => {
      this.cosnts = res;
    })
    this.consentForm = this.getConsentForm();
    this.consentSerachForm=this.getSearchForm();
  }
  getSearchForm(): FormGroup {
    return this.fb.group({
      'dtbetween':new FormControl('',Validators.nullValidator),
      'ctag':new FormControl('',Validators.nullValidator),
      'assignee':new FormControl('',Validators.nullValidator),
      'conscatType':new FormControl('',Validators.nullValidator),
      'visitype':new FormControl('',Validators.nullValidator)
    });
  }
  getConsentForm(): FormGroup {
    return this.fb.group({
      'templateName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      'consName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    }
    );
  }

  isDrRole() {
    return (this.gsrv.getBeeGlobal().currentRole && (this.gsrv.getBeeGlobal().currentRole.indexOf('ROLE_DR') > 0));
  }

  selectConsent(event: Event, cn: Consnt) {
    this.selectedCons = cn;
    this.displayDialog = true;
    event.preventDefault();
  }

  editSelectConsent(event: Event, cn: Consnt) {
    this.selectedCons = cn;
    this.displayEditDialog = true;
    this.displayDialog = false;
    event.preventDefault();
    this.consentForm.reset()
  }

  onDialogHide(e) {
    this.selectedCons = null;
  }

  revokeConsent() {
    var consIds: string[] = [];
    consIds.push(this.selectedCons.cons_id);
    this.consentSrvs.revokeConsents(consIds).then(e => {
      this.messageService.add({ severity: 'success', summary: 'Consent Revoked', detail: 'Consent access has been revoked' });
    })
      .catch(err => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Consent revocation has been failed' });
      });
  }

  filterTemplate(event) {
    let query = event.query;
    this.consentSrvs.getUserConsents(query).then(res => {
      let tcosnts: Consnt[] = res;
      this.filteredTemplate = tcosnts.map(e => {
        return { name: e.cosnt_name };
      })
    });
  }
  searchConsent(e:Event){
    this.consentSrvs.searchConsents(this.consentSerachForm.value).then(res=>{
      this.cosnts=res;
    });
  }

  saveConsent(e) {
    let formVal = this.consentForm.value;
    console.debug(formVal);
    this.selectedCons.cosnt_name = formVal['consName'];
    this.selectedCons.cosnted_template = [];
    this.selectedCons.cosnted_template.push(formVal['templateName']);

    this.consentSrvs.updateConsent(this.selectedCons).then(res => {
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Consent has been updated' });
    })
      .catch(err => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Consent update has been failed' });
      });
  }
}

/**********************************************
*
*  This class is for assignment of consnet to a doctor or care provider by
* benificiary
************************************************************/
class ConsentObj implements Consnt {
  cosnted_ehr: string[];
  cosnted_template: string[];
  cons_id: string;
  created: Date;
  cosnt_name: string;
  cosnt_type: string;
  validity: string;
  validity_unit: string;
  cosnt_tag: string[];
  cosnt_assignee: string[];
  cosnt_cat_type: string[];
  is_active: boolean;
  remarks: string;
}

@Component({
  selector: 'app-mgnt-consent',
  templateUrl: './assign-consent.component.html',
  styleUrls: ['./mgnt-consent.component.css'],
  providers: [ProfileService, GlobalBeeService]
})
export class AssignConsentComponent implements OnInit {
  cosnt_type: SelectItem[];
  cosnt_cat_type: SelectItem[];
  valididty_unty: SelectItem[];
  newConst: Consnt = new ConsentObj();
  filteredAssigneeMultiple: any[];
  consAssignmentform: FormGroup;
  cosnt_shares: string[];
  filteredTemplate: any;

  phoneOTP: string;

  constructor(private mdataSrvs: MetadataService, private messageService: MessageService,
    private fb: FormBuilder,
    private prfSrvs: ProfileService, private consentSrvs: ConsentService, private gsrv: GlobalBeeService) { }

  ngOnInit(): void {
    this.mdataSrvs.getJSONRef().then(res => {
      this.cosnt_type = this.mdataSrvs.getConsentTypeList();
      this.cosnt_cat_type = this.mdataSrvs.getEhrCategoryList();
      this.valididty_unty = this.mdataSrvs.getConsentValidityUnit();
    })
    this.newConst = new ConsentObj();

    this.consAssignmentform = this.getAssignmentForm();
  }


  getAssignmentForm() {
    return this.fb.group({
      'templateName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      'expiryDt': new FormControl('', Validators.nullValidator),
      'consName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    });
  }
  isDrRole() {
    return (this.gsrv.getBeeGlobal().currentRole && (this.gsrv.getBeeGlobal().currentRole.indexOf('ROLE_DR') > 0));
  }
  filterTemplate(event) {
    let query = event.query;
    this.consentSrvs.getUserConsents(query).then(res => {
      let tcosnts: Consnt[] = res;
      this.filteredTemplate = tcosnts.map(e => {
        return { name: e.cosnt_name };
      })
    });
  }

  filterAssigneMultiple(event) {
    let query = event.query;
    console.debug(query);
    this.filteredAssigneeMultiple = [{ name: query + 'aaaaa' }, { name: query + 'aaab' }];
  }
  shareAssignment(e: Event) {
    this.messageService.clear();
    if (!this.cosnt_shares || this.cosnt_shares.length <= 0) {
      this.messageService.add({ summary: "Missing", severity: 'warn', detail: 'Share details required' });
    } else {
      this.saveAssignment(e, true);
    }
  }
  saveAssignment(e: Event, shareFlg?: boolean) {
    let value = this.consAssignmentform.value;
    if (value['expiryDt']) {
      this.newConst.validity = value['expiryDt'];
    } else {
      this.newConst.validity = "7";
    }

    this.newConst.cosnted_template = [];
    this.newConst.cosnted_template.push(value['templateName']);
    if (!shareFlg) {
      if (!this.newConst.cosnt_assignee || this.newConst.cosnt_assignee.length <= 0) {
        this.messageService.add({ summary: "Missing", severity: 'warn', detail: 'At least one assignee required' });
        return false;
      }
    }
    console.debug(this.newConst);
    this.sendOTP(false);

  }
  cancelAssign() {
    this.messageService.clear('c');
  }

  sendOTP(resend: boolean) {
    this.messageService.clear();
    if (!resend) {
      this.prfSrvs.sendMobileOTP().then(e => {
        this.messageService.add({ severity: 'info', summary: 'OTP Re-send', detail: 'OTP has been send to registered email and phone' });
        this.messageService.add({ key: 'otp', severity: 'warn', summary: 'Enter OTP', detail: 'OTP will be valid for next 5minutes' });
      });

    } else {
      this.prfSrvs.reSendMobileOTP().then(e => {
        this.messageService.add({ severity: 'info', summary: 'OTP Re-send', detail: 'OTP has been re-send to registered email and phone' });
        this.messageService.add({ key: 'otp', severity: 'warn', summary: 'Enter OTP', detail: 'OTP will be valid for next 5minutes' });
      });
    }
  }

  verifyOTP() {

    this.messageService.clear();
    if (this.prfSrvs.verifyMobileOTP(this.phoneOTP)) {
      //assign the consnet
      if (!this.cosnt_shares || this.cosnt_shares.length <= 0) {
        this.consentSrvs.createConsent(this.newConst).then(res => {
          this.messageService.add({ key: 'c', sticky: true, severity: 'success', summary: 'Save', detail: 'Consent has been assigned' });
        }).catch(err => {
          this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Save', detail: 'Consent Assignment Failed, Try again later' });
        })
      } else {
        //share the consent
        this.consentSrvs.createAndShareConsent(this.newConst, this.cosnt_shares).then(res => {
          this.messageService.add({ key: 'c', sticky: true, severity: 'success', summary: 'Save', detail: 'Consent has been assigned' });
        }).catch(err => {
          this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Save', detail: 'Consent Assignment Failed, Try again later' });
        })

      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'OTP Verification', detail: 'Invalid OTP, Please enter valid OTP' });
    }


  }

}