import { Component, OnInit } from '@angular/core';
import { ProfileService, ProfileAdd, Profiledet } from 'bee-lib';
import { MessageService, SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [ProfileService, MessageService]
})
export class AddressComponent implements OnInit {
  otherAdd: ProfileAdd[];
  displayAdddlg: boolean = false;
  newAddress: ProfileAdd;
  userAddressform: FormGroup;
  cities: SelectItem[];

  constructor(private srvs: ProfileService, private msgSrvs: MessageService, private fb: FormBuilder) {
    this.srvs.getOtherAddress().then(res => {
      this.otherAdd = res
      this.otherAdd.push(new ProfileAdd());
    });        
    this.srvs.getCities().then(res => this.cities = res);
  }

  ngOnInit() {    
    
    this.newAddress = new ProfileAdd();
    this.userAddressform = this.getUserAddressform();
  }

  getUserAddressform() {
    return this.fb.group({     
      'address_line1': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      'address_line2': new FormControl('', Validators.nullValidator),
      'city': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'pin': new FormControl('', Validators.required),
      'primemobile': new FormControl('', Validators.nullValidator),
   });
  }

  onSubmit(value: string) {
    
    var newadd:ProfileAdd=JSON.parse(JSON.stringify(this.userAddressform.value));
    this.srvs.createAddress(newadd)
    .then(res=>{
      newadd=res;
      this.otherAdd.splice(this.otherAdd.length-1,0,newadd);
      this.displayAdddlg = false;
      this.msgSrvs.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });  
      this.userAddressform.reset(); 
      return true;
    }).catch(err=>{
      this.msgSrvs.add({ severity: 'error', summary: 'Error', detail: 'Address submition failed' });   
      return false;
    });    
  }

  deleteAdd(adId:string){
    console.debug(adId);
    this.srvs.setAddressDeleted(adId)
    .then(res=>{
      
      this.otherAdd = this.otherAdd.filter((val, i) =>val.adId!=adId);
      this.msgSrvs.add({ severity: 'info', summary: 'Success', detail: 'Address deleted' });  
      return true;
    })
    .catch(err=>{
      this.msgSrvs.add({ severity: 'error', summary: 'Error', detail: 'Address deletion failed' });  
      return false;
    });
    
    
  }
}
