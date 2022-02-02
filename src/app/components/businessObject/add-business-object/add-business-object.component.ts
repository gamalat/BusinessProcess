import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
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
  disabled = true;
  constructor(private boService: BusinessObjectService) { }

  ngOnInit(): void {

    // if(this.bo_NAME.length>100 &&this.bo_CODE.length>20 ||){
    
    // }
  }
  reset(_addForm:any){
  console.log ("reset")
 
 this.bo_CODE="";
 this.bo_NAME="";
 this.description="";

  }
  
  public onAddBusinessObj(addForm: NgForm): void {
    if(this.bo_CODE.length>20 || this.bo_NAME.length>100 ||  this.description.length>200){
      bootbox.alert({
        title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
        message: "<span style='font-weight: 400; font-size: 16px;'>"+"Invaild field length"+"</span>  </i>",
        callback: function(){ 
        
        }
    });
    }
    else{
    console.log(addForm.value);
    this.boService.addBusinessObject(addForm.value).subscribe(
      (response: any) => {
         if(response.code == "1"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+"Business Object Added Successfully"+"</span>  </i>",
            callback: function(){ 
              location.reload();
              this.getBo();
            }
        });
        console.log(response);
      
        // document.getElementById("add-obj-form")?.click();
        // this.reset(addForm);
        // 
         }else
         if(response.code == "-2"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;  '>"+"Waring"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Business object code already exist "+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }else
         if(response.code == "-3"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Contact your system administrator"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); }
  }




  public getBo() {
    this.boService.getBusinessObj().then(data => {
      console.log(data);
      this.AllData = data;
      console.log(this.AllData);

    })
  }


}
