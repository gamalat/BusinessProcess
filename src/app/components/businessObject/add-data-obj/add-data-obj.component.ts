import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataObj } from 'src/app/interfaces/DataObj';
import { DataObjectService } from 'src/app/services/data-object.service';
declare var bootbox: any;

@Component({
  selector: 'app-add-data-obj',
  templateUrl: './add-data-obj.component.html',
  styleUrls: ['./add-data-obj.component.css']
})
export class AddDataObjComponent  {
@Input() bo: any;
  bo_ID: any;
  lTypes: any[] = [
    { id: 1, Name: 'Form' },
    { id: 2, Name: 'Tab'},
    { id: 3, Name: 'Table' }];
curType: any = this.lTypes[0]; // first will be selected by default by browser
  do_CODE: string="";
  do_NAME: string="";
  do_TYPE: string="";
  description: string="";
setNewType(id: any): void {
    console.log(id);
    // Match the selected ID with the ID's in array
    this.curType = this.lTypes.filter(value => value.id === parseInt(id));
    console.log(this.curType);
}
  constructor(private doService:DataObjectService) { }
 

  // public onAddDatasObj(BO_id: number ,_f:any): void {
  //   this.bo_ID=this.bo.bo_ID;
  //   // add dataObject
  //   this.doService.addDataObject(BO_id,_f).subscribe(
  //     Response => {
  //       console.log(Response);
  //       console.log(this.bo.bo_ID);
  //       if (Response == "1") {
  //         bootbox.alert({
  //           // title: "<span style='font-weight: 400; font-size: 16px;'>"+" Completed Successfully"+"</span>  </i>",
  //           message: "<span style='font-weight: 400; font-size: 16px;'>" + "Data Object Added Successfully " + "</span>  </i>",
  //           // callback: function () {
  //           //   window.location.reload();
  //           // }
  //         });
  //       }
  //     });
  //   }

  reset(_addForm:any){
    this.bo_ID="";
    this.do_CODE="";
    this.do_NAME="";
    this.do_TYPE="";
    this.description="";
  }
    public onAddDatasObj(BO_id:number,addForm: NgForm): void {
      console.log(addForm.value);
    
      this.doService.addDataObject(BO_id,addForm.value).subscribe(
        (response: any) => {
          if(response.code == "1"){
            bootbox.alert({
              title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
              callback: function(){ 
              }
          });
          console.log(response);
         
          // // document.getElementById("add-obj-form")?.click();
          // this.reset(addForm);
          location.reload();
           }else
         if(response.code == "-2"){
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }else
         if(response.code == "-3"){
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
}
