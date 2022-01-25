import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

}
