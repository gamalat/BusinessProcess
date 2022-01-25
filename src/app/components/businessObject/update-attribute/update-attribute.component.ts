import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Dependant } from 'src/app/interfaces/Dependant';
import { ObjectAttribute } from 'src/app/interfaces/ObjectAttribute';
import { ObjectAttributeService } from 'src/app/services/object-attribute.service';

import { NgForm } from '@angular/forms';
declare var $: any;
declare var bootbox: any;
var cList = $('#choice_LIST').val()

@Component({
  selector: 'app-update-attribute',
  templateUrl: './update-attribute.component.html',
  styleUrls: ['./update-attribute.component.css']
})
export class UpdateAttributeComponent implements OnInit  {
//  @Input() att_ID: any;
att_ID:any="";

 bo_ID:any="";
 do_ID:any="";
 att_CODE:any="";
 att_NAME:any="";
  LookUpDisabled=true;
  depAttDisabled=true;
  dependent :any=0 ;
  choice_LIST:any=0;
  att_TYPE:any="String";
  lookup_ID:any;
  dep_ATT_ID:any="";
  description:any="";
  att_CODE1:any="";
  AllData: any="";
  disabled = false;
  dependantChecked=true; //default disable checked
  lookups: any;
  readonly=true;
  checked=false;
  Dchecked=false;
  dependants: Dependant[] = [];
  l: boolean | undefined;

  constructor(private attService:ObjectAttributeService) { }

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

ngOnInit(): void { 
 console.log("ON INIT");
 
  this.attService.getLookupID().subscribe(
    (response: any) => {
      console.log(response);
      this.lookups = response.body;
      console.log(this.lookups);
    
    }
  );
  
  // this.getAttbyID();
}


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


getCodec= () =>{
  if(this.do_ID==undefined){
    this.att_CODE=this.att_NAME+this.bo_ID;
    console.log(this.att_CODE);
   
  }else{
    this.att_CODE=this.att_NAME+this.do_ID;
    console.log(this.att_CODE);
  }
}
g(_b:any,_d:any,att:any){
  if(_d ==undefined){
    this.attService.getDependant(att,_b).subscribe(
      (response: any) => {
        console.log(response);
        this.dependants = response.body;
        console.log("getDependant for B");
        console.log(this.dependants);

      }
    );
  }else{
    this.attService.getDependant(att,_d).subscribe(
      (response: any) => {
        console.log(response);
        this.dependent = response.body;
        console.log(this.dependants);
        console.log("getDependant for D");

        console.log(response.body);

      }
    );
  }
}
  listfieldsChange(values:any):void {
    if(values.currentTarget.checked){//true
      this.disabled=true; //disable checked
      this.att_TYPE="String"
      this.dependantChecked=false; //enable checked
      this.LookUpDisabled=false;
      this.choice_LIST=1;
      this.l=true;
      this.readonly=true;
    }else{
      this.disabled=false
      this.dependantChecked=true; //enable checked
      this.LookUpDisabled=true;
      this.depAttDisabled=true;
      this.choice_LIST=0;
      this.l=false;
      this.readonly=false;;

    }
        console.log(values.currentTarget.checked);
      }

      
  // console.log("id"+this.att_ID);
  public getAttbyID(att_ID :any) {

    this.attService.getAttributeById(att_ID).subscribe(
      (response: any) => {
        console.log( response);
        // alert(response.body.att_CODE);
        this.AllData = response.body;
        // this.att_CODE=response[1].att_CODE;
        // console.log(response.att_CODE);
        this.att_CODE= response.body.att_CODE;
        this.att_NAME=response.body.att_NAME;
        //  alert(this.att_NAME);
        //  alert(this.att_CODE);

        this.choice_LIST=response.body.choice_LIST;
        this.att_TYPE=response.body.att_TYPE;
        this.lookup_ID=response.body.lookup_ID;
        this.dependent=response.body.dependent;
        this.description=response.body.description;
        this.do_ID=response.body.do_ID;
        this.bo_ID=response.body.bo_ID;
        this.att_ID=response.body.att_ID;
        this.dep_ATT_ID=response.body.dep_ATT_ID;
        //  response.att_CODE;
        // console.log("AllData");
        // console.log(this.AllData);
        console.log("bo id" ,this.bo_ID);
        console.log("do id" ,this.do_ID);
        console.log(this.att_ID);
      //   if($('#choice_LIST').val() == '1') { 
      //     $('#l').prop('checked', true);
      // }

      console.log("dependent",this.dependent);

  if(this.dependent===1){
   this.checked=true;

   console.log("true",this.checked);
  }else{
    this.checked=false;
    console.log("false",this.checked);


  }
  if(this.choice_LIST===1){
    this.Dchecked=true;
 
    console.log("true",this.Dchecked);
   }else{
     this.Dchecked=false;
     console.log("false",this.Dchecked);
 
 
   }
      //   if(response.body.choice_LIST =='1') { 
      //     console.log("checked")
      //     console.log(response.body.choice_LIST =='1')
      //     $('#l').prop('checked', true);
      //     console.log("after checked")

      // }else
      // if(response.body.choice_LIST =='0') {
      //   $('#l').prop('checked', false);
      //   console.log("false checked")
      // }
        this.g(this.bo_ID,this.do_ID,this.att_ID);
        var gg="#"+this.att_ID;
        // if(this.choice_LIST === 1){
        //   console.log("checked")
        //   $("#l").prop('checked', true);
        //   console.log("after checked")
        // }
        $("#objectAttribute1").modal('show');

        // document.getElementById("").click();
        // document.getElementById("objectAttribute1").click();

   
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  reset(){
   this. att_ID ="";
    this.bo_ID="";
    this. do_ID="";
    this. att_CODE="";
    this. att_NAME="";
    this. dependent ="" ;
    this.  choice_LIST="";
    this. att_TYPE="";
    this. lookup_ID="";
    this. dep_ATT_ID="";
    this. description="";
    this. AllData=""; 
  }


  public onUpdateAttObj(addForm: NgForm): void {
   this.att_TYPE="String";
    console.log(addForm.value);
    this.attService.editAttObject(addForm.value).subscribe(
      (response: any) => {
        if(response.code == "2"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+"Object Attribute updated  successfully "+"</span>  </i>",
            callback: function(){ 
              location.reload();
            }
        });
    
         }else
         if(response.code == "-2"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size:20px;'>"+"Waring"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+"Object Attribute already exist"+"</span>  </i>",
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
