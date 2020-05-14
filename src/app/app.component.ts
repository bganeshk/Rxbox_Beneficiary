import { Component, OnInit, Inject } from '@angular/core';
import { GlobalBeeService } from 'bee-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GlobalBeeService]
})
export class AppComponent implements OnInit{
  title = 'Rxbox-Beneficiary';
  visibleSideMenu:boolean;
  visiblefull:boolean;
  date=new Date();
  myTemplate:any="";
  private env;
  
  ngOnInit() {
  }

  constructor(private gsrv:GlobalBeeService,@Inject('environment')  environment){
    this.env=environment;
    if(this.env.production){
      //disable the debugs
      console.debug = function(){}; 
    }
  }
  getCurrentPage():string{   
    
    return this.gsrv.getCurrentPage();
    
  }
  getLogginStatus():boolean{
    return (this.gsrv.isLoggedIn());
  }
  logout(){
    this.gsrv.logout();
  }
 
  getLoginName():string{
    return this.gsrv.getLoginName();
  }

  getHelpHtmlContent(){
    this.myTemplate="";
    this.gsrv.getHelpContent(this.getCurrentPage()+".html").then(res => this.myTemplate = res);
  }

}
