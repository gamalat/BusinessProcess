import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as FileSaver from 'file-saver';
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
  faction_DATE:any;
  saction_DATE:any;
  notes:any;
  errorMsg:string="No Date found.";
  SPageNo:any=1;
  Size :number=100;
  searchFlag:boolean=false;
  fDATE: any;
  sDATE: any;
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
  
    if(f.value.faction_DATE==null || f.value.faction_DATE==undefined ||f.value.faction_DATE==''){
      this.fDATE=null
    } else{
      this.fDATE = formatDate( f.value.faction_DATE, 'MM/dd/yyyy', 'en')

    }
    if(f.value.saction_DATE==null || f.value.saction_DATE==undefined ||f.value.saction_DATE==''){
      this.sDATE=null
    }else{
      this.sDATE = formatDate( f.value.saction_DATE, 'MM/dd/yyyy', 'en')

    }
    var obj={
      "action": f.value.action,
      "action_BY": f.value.action_BY,
      "notes": f.value.notes,
      "faction_DATE": this.fDATE,
      "saction_DATE": this.sDATE
  
  };
  
  console.log("search object",obj)
  

    this.auditService.AuditٍSearch(this.SPageNo,this.Size,obj).subscribe(
      (response: any) => {      
        console.log("audit search")
        console.log(response.body)

        console.log(f.value.action_ID);
        console.log(this.sDATE);
        console.log(this.fDATE);
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
    this.faction_DATE="";
    this.saction_DATE="";
    this.notes="";
    this.getAllAudit(1,100);
    console.log(this.PageNo)
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.audits);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Audits");
    });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}


