import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  audits: any;
  PageNo:any=1;
  action:any;
  action_ID:any;
  action_BY:any;
  action_DATE:any;
  notes:any;
  errorMsg:string="No Date found.";
  SPageNo:any=1;
  Size :number=100;
  searchFlag:boolean=false;
  constructor(private auditService:AuditService ) { }

  ngOnInit(): void {
    this.getAllAudit(this.PageNo,100);
  }
 

  public getAllAudit(PageNo:number ,Size :number){
    this.auditService.allAudit(PageNo,Size).subscribe(
      (response: any) => {       
        console.log("audit component")
        console.log(response.body)
        this.audits = response.body;
        console.log(this.audits);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public search(f:NgForm){
    this.searchFlag=true;
    this.auditService.AuditٍSearch(this.SPageNo,this.Size,f.value).subscribe(
      (response: any) => {      
        console.log("audit search")
        console.log(response.body)
        console.log(f.value.action_ID);
        this.audits = response.body;
        console.log(this.audits);
        this.SPageNo=this.SPageNo+1;
        console.log(this.SPageNo)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onReadMore(){
    this.PageNo=this.PageNo+1;
    this.getAllAudit(this.PageNo,100);
  }
  pervious(){
    this.PageNo=this.PageNo-1;
    this.getAllAudit(this.PageNo,100);
  }

  // onNextS(){
  //   this.s
  // }
  reset(){
    console.log("audit here")
    this.action="";
    this.action_BY="";
    console.log("audit oooo")
    this.action_DATE="";
    this.notes="";
    this.getAllAudit(1,100);
  }
}


