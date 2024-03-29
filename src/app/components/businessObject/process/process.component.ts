import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent  {
  @Input() bo_ID: any;
  processes: any;
  
  constructor(private process:ProcessService) {}

  public getAllProcess(){
    this.process.allProcesses(this.bo_ID).subscribe(
      (response: any) => {       
        console.log(this.bo_ID);
        console.log("process component")
        console.log(response.body)
        this.processes = response.body;
        console.log(this.processes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // ngOnInit(): void {
  //   this.getAllProcess();
  // }
  exportExcel() {
    import("xlsx").then(xlsx => {
      let element = document.getElementById('processTable');
      console.log(element)
      var ws = xlsx.utils.table_to_sheet(element);
      var wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "");
            const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "processes");
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
