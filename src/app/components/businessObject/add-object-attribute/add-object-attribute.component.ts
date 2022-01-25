import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dependant } from 'src/app/interfaces/Dependant';
import { ObjectAttribute } from 'src/app/interfaces/ObjectAttribute';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ObjectAttributeService } from 'src/app/services/object-attribute.service';
import { BusinessTableComponent } from '../business-table/business-table.component';
import { Lookups } from 'src/app/interfaces/Lookups';

declare var bootbox: any;

@Component({
  selector: 'app-add-object-attribute',
  templateUrl: './add-object-attribute.component.html',
  styleUrls: ['./add-object-attribute.component.css']
})
export class AddObjectAttributeComponent implements OnInit  {
  lookups: Lookups[] = [];
  dependants: Dependant[] = [];
  @Input() bo_ID: any;
  @Input() do_ID: any;
  
  att_CODE :any="";
  att_NAME:any="";
  description:any="";
  form: any;
  LookUpDisabled=true;
  depAttDisabled=true;
  dependent :any = 0;
  choice_LIST:any=0;
  t:any=0;
  disabled = false;
  dependantChecked=true; //default disable checked
  att_TYPE:any;

  lookup_ID: any;
  dep_ATT_ID: any;
  ngOnInit(): void { 
    this.attService.getLookupID().subscribe(
      (response: any) => {
        console.log(response);
        this.lookups = response.body;
        console.log(this.lookups);
      
      }
    );
    

  
  }

  getCodec= () =>{
    if(this.do_ID==undefined){
      this.att_CODE=this.att_NAME+this.bo_ID;
      console.log("att_CODE",this.att_CODE);
     
    }else{
      this.att_CODE=this.att_NAME+this.do_ID;
      console.log("att_CODE",this.att_CODE);
    }
  }

//   getCode(){
//     console.log();
// alert("hh")
//  // (_b:any ,_d :any ,_att_name :any){
//     // if(_d ==undefined){
//     //   this.att_CODE=_b +_att_name;
//     //   console.log( this.att_CODE);
//     // }else{
//     //   this.att_CODE=_d +_att_name;

//     // }
//   }

 
g(_b:any,_d:any){
  if(_d ==undefined){
    this.attService.getDependant(0,_b).subscribe(
      (response: any) => {
        console.log(response);
        this.dependants = response.body;
        console.log("getDependant for B");
        console.log(this.dependants);

      }
    );
  }else{
    this.attService.getDependant(0,_d).subscribe(
      (response: any) => {
        console.log(response);
        this.dependants = response.body;
        console.log(this.dependants);
        console.log("getDependant for D");

        console.log(response.body);

      }
    );
  }
}
// getcode(Att_NAME:any,bo_ID:any,do_ID:any){
//   if(do_ID ==undefined){
//     this.att_CODE=Att_NAME+bo_ID;
//   }else{
//     this.att_CODE=Att_NAME+do_ID;
//   }
// }
dependantfieldsChange(values:any):void{
  if(values.currentTarget.checked){//true
    this.depAttDisabled=false; //enable checked
    this.dependent=1;
  //  this.t=1;
 
  } else{
    this.dependent=0;
   // this.t=0;

  }
}
  listfieldsChange(values:any):void {
if(values.currentTarget.checked){//true
  this.disabled=true; //disable checked
  this.dependantChecked=false; //enable checked
  this.LookUpDisabled=false;
  this.choice_LIST=1;
  this.att_TYPE="String"
}else{
  this.disabled=false
  this.dependantChecked=true; //enable checked
  this.LookUpDisabled=true;
  this.depAttDisabled=true;
  this.choice_LIST=0;
}
    console.log(values.currentTarget.checked);
  }

 
  lTypes: any[] = [
    { id: 1, Name: 'Boolean' },
    { id: 2, Name: 'Date'},
    { id: 3, Name: 'DataTime' },
    { id: 4, Name: 'File'},
    { id: 5, Name: 'Float' },
    { id: 6, Name: 'Integer'},
    { id: 7, Name: 'String' },
    { id: 8, Name: 'Time'}
];
curType: any = this.lTypes[0]; // first will be selected by default by browser



setNewType(id: any): void {
    console.log(id);
    // Match the selected ID with the ID's in array
    this.curType = this.lTypes.filter(value => value.id === parseInt(id));
    console.log(this.curType);
}

resetForm(_addForm:any){
  this.bo_ID="";
  this.do_ID="";
  this.att_CODE="";
  this.att_NAME="";
  this.choice_LIST="";
  this.att_TYPE="";
  this.dependent="";
  this.lookup_ID="";
  this.dep_ATT_ID="";
  this.description="";

}
  
  constructor(private attService:ObjectAttributeService ) { }
  public onAddAttObj(addForm: NgForm): void {
    if(this.att_CODE.length>100 || this.att_NAME.length>100 ||this.description.length>200){
      bootbox.alert({
        title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
        message: "<span style='font-weight: 400; font-size: 16px;'>"+"Invaild field length"+"</span>  </i>",
        callback: function(){ 
      
        }
    });
    }else{
    console.log(addForm.value);
    this.attService.addAttObject(addForm.value).subscribe(
      (response: any) => {
        if(response.code == "1"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Object Attribute Added Successfully"+"</span>  </i>",
            callback: function(){ 
              location.reload();
           
            }
        });
        console.log(response);
      
         }else
         if(response.code == "-2"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;  '>"+"Waring"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Object Attribute code already exist "+"</span>  </i>",
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
    );
  }
  }

}

