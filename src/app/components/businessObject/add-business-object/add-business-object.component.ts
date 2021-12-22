import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BussinessObject } from 'src/app/interfaces/BussinessObject';
import { BusinessObjectService } from 'src/app/services/business-object.service';
declare var bootbox: any;

@Component({
  selector: 'app-add-business-object',
  templateUrl: './add-business-object.component.html',
  styleUrls: ['./add-business-object.component.css']
})
export class AddBusinessObjectComponent implements OnInit {
  AllData: BussinessObject[] | undefined;
  bo_NAME: string="";
  bo_CODE:string="";
  description:string="";
  constructor(private boService: BusinessObjectService) { }

  ngOnInit(): void {
  }
  reset(_addForm:any){
  console.log ("reset")
 
 this.bo_CODE="";
 this.bo_NAME="";
 this.description="";

  }
  public onAddBusinessObj(addForm: NgForm): void {
    console.log(addForm.value);
    this.boService.addBusinessObject(addForm.value).subscribe(
      (response: any) => {
         if(response.code == "1"){
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            callback: function(){ 
            }
        });
        console.log(response);
        this.getBo();
        // document.getElementById("add-obj-form")?.click();
        this.reset(addForm);
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




  public getBo() {
    this.boService.getBusinessObj().then(data => {
      console.log(data);
      this.AllData = data;
      console.log(this.AllData);

    })
  }


}
