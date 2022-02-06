import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ObjectAttribute } from 'src/app/interfaces/ObjectAttribute';
import { BusinessObjectService } from 'src/app/services/business-object.service';
import { DataObjectService } from 'src/app/services/data-object.service';
import { ObjectAttributeService } from 'src/app/services/object-attribute.service';
import { UpdateAttributeComponent } from '../update-attribute/update-attribute.component';
declare var bootbox: any;
declare var $: any;

@Component({
  selector: 'app-business-attribute',
  templateUrl: './business-attribute.component.html',
  styleUrls: ['./business-attribute.component.css']
})
export class BusinessAttributeComponent {

  // @ViewChild(BusinessTableComponent)
  // private bc!: BusinessTableComponent;
  
  @ViewChild(UpdateAttributeComponent)
  private updateAttributeComponent!: UpdateAttributeComponent;
  @Output()
  startReLoadData: EventEmitter<any> = new EventEmitter<any>();

  popoverTitle = 'Confirm';
  popoverMessage = 'Are You Sure to delete';
  confirmClicked = false;
  cancelClicked = false;
  panelOpenState = false;
  dType=true;
  @Input() par: any;
[x:string]:any;
  // bo_NAME=this.boc.onRowBo
  NAME: any;
  CODE: any;
  description: any;
  ID: any;
  AllData:any= [];
  do_ID:any;
  do_TYPE: any;
  rowData1: any = [];
  att_ID: any;
  objects: ObjectAttribute[] = [];
  display=false;
  DAttID:any;
  DAttName:any;
   cloneBussObj:any;
   cloneDataObj:any;
  // boService!: BusinessObjectService;
  lTypes: any[] = [
    { id: 1, Name: 'Form' },
    { id: 2, Name: 'Tab'},
    { id: 3, Name: 'Table' }];

   

curType: any = this.lTypes[0]; // first will be selected by default by browser
setNewType(id: any): void {
    console.log(id);
    // Match the selected ID with the ID's in array
    this.curType = this.lTypes.filter(value => value.id === parseInt(id));
    console.log(this.curType);
}
  constructor(private ObjectAttributeService: ObjectAttributeService
    , public boService: BusinessObjectService
    ,public doService: DataObjectService) { }


  public selectedName: any;
  // highight Attributes
  public highlightAttObj(MainData: { att_NAME: any; }) {
    this.selectedName = MainData.att_NAME;
  }

  onPress(val: any){
    console.log("val ", val);
    this.att_ID = val;
    this.display=true;
    this.updateAttributeComponent.getAttbyID(val);
  }
  // get all attribute with object id
  getAttributeObj(Obj_id: number, selectedData: any) {
    console.log(Obj_id);
    console.log("selected data",selectedData);
     this.cloneBussObj=Object.assign({},selectedData);
    console.log("cloneBussObj data",this.cloneBussObj);

    this.NAME = selectedData.bo_NAME;
    this.ID = selectedData.bo_ID;
    this.description = selectedData.description;
    this.CODE = selectedData.bo_CODE;
    this.do_TYPE =null;
    this.ObjectAttributeService.getAttributeObjForBo(Obj_id).subscribe(
      (response: any) => {
        console.log("response.body");
        console.log(response.body);
        this.AllData=response.body;
        this.rowData = response.body;
        console.log("DDDDDDDDD")
        console.log(this.AllData);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //get all do 
  getAttributeObjD(Obj_id: number, selectedData: any) {
    this.cloneDataObj=Object.assign({},selectedData);
    console.log("cloneObj data",this.cloneDataObj);
    console.log(Obj_id);
    console.log(selectedData);
    this.NAME = selectedData.do_NAME;
    console.log("do name = " + selectedData.do_NAME)
    this.do_ID = selectedData.do_ID;
    this.description = selectedData.description;
    this.CODE = selectedData.do_CODE;
    this.do_TYPE = selectedData.do_TYPE;
    this.ObjectAttributeService.getAttributeObjForBo(Obj_id).subscribe(
      (response: any) => {
        console.log(response);
        this.rowData = response.body;
        console.log(this.rowData);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //delete Bo from table
  public onDeleteAtt(Att_ID: number): void {
    this.ObjectAttributeService.deleteAtt(Att_ID).subscribe(
      (response: any) => {
        if(response.code == "-3"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"contact your system administrator"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }
         if(response.code == "3"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Object Attribute deleted successfully "+"</span>  </i>",
            callback: function(){ 
              window.location.reload();
            
            }
        });
        
         }

         if(response.code == "-6"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Object Attribute has Child"+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }

       
         if(response.code == ("-1" || "-4")){  
          bootbox.alert({
        
            title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+" Object Attribute not exist"+"</span>  </i>",
            callback: function(){ 
            }
        });
        
         }
     
        console.log(response.code);
     
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//on press delete icon
  public onPressAtt(MainData:any){
    $("#deleteAttModal").modal('show');
    console.log("MainData",MainData)
    this.DAttID=MainData.att_ID;
    this.DAttName=MainData.att_NAME;
  }
  //edit business object 
  public onEditBusinessObj(_f: any): void {
    console.log(_f);
    
    // const food = { beef: '🥩', bacon: '🥓' };

    // const cloneFood = { ...food };
    
    // console.log(cloneFood);
    if(_f.do_TYPE == null){
    console.log(_f);
    var bobj = {
      "bo_ID": _f.ID, "bo_NAME": _f.NAME, "description": _f.description,"bo_CODE":_f.CODE
    }
    //  var ob={
    //   "bo_ID":this.ID ,"bo_NAME":this.NAME ,"description":this.description ,"bo_CODE":this.CODE
    // }
    this.boService.editBusinessObject(bobj).subscribe(
      response => {
        console.log(response.code);
        console.log(bobj);
        sessionStorage.setItem("BOject",JSON.stringify(bobj));


        if (response.code == "2") {
          bootbox.alert({
            title: "<span style='font-weight:600; font-size: 20px;'>"+"Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Business Object updated successfully."+ "</span>  </i>",
            callback: function () {
               window.location.reload();
            // this.onRowBo(bobj);

            // console.log("jjjjj",this.startDoingFilter.emit());
              // console.log("hhhh")
            }
          });
        }
        
        else if(response.code == "-3"){
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>"+response.body+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + response.body+ "</span>  </i>",
            callback: function () {
              window.location.reload();
            }
          });
        }
      });
    }else{
      var Dobj = {
        "bo_ID": _f.ID, "do_ID": _f.do_ID, "do_CODE":_f.CODE,"do_NAME": _f.NAME,"description": _f.description ,"do_TYPE":_f.do_TYPE
      }
      this.doService.editDataObject(_f.ID,Dobj).subscribe(
        Response => {
         // sessionStorage.setItem("DoID",this.do_ID); //set daata Id in session foe selected 
          sessionStorage.setItem("DOject",JSON.stringify(Dobj));

          console.log(Response.code);
          console.log(Response.body);

          console.log(Dobj);
          console.log("bo id"+_f.ID);
          if (Response.code == "2") {
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" +"Data Object updated successfully" + "</span>  </i>",
              callback: function () {
                window.location.reload();
              }
            });
          }
          else if(Response.code == "-3"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+Response.body+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + Response.body + "</span>  </i>",
              callback: function () {
                // window.location.reload();
              }
            });
          }
        });
    }

  
  }




  public onCancelBusinessObj(): void {
    // console.log(_f);

    if(this.do_TYPE == null){
     
    this.ID= this.cloneBussObj.bo_ID;
    console.log(this.cloneBussObj.bo_ID)
     this.NAME= this.cloneBussObj.bo_NAME;
     console.log(this.cloneBussObj.bo_NAME)
     this.description= this.cloneBussObj.description;
     console.log(this.cloneBussObj.bo_CODE)
     this.CODE=  this.cloneBussObj.bo_CODE ;
   
    }else{
      this.ID=this.cloneDataObj.bo_ID;
      this.do_ID=this.cloneDataObj.do_ID;
      this.NAME=this.cloneDataObj.do_NAME
      this.description=this.cloneDataObj.description;
      this.CODE=this.cloneDataObj.do_CODE;
      this.do_TYPE=this.cloneDataObj.do_TYPE;
      
    }
  }
  resetForm(){
   this.do_ID="";
   this.ID="";
   this.CODE="";
   this.NAME="";
   this.description="";
   this.do_TYPE="";

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      let element = document.getElementById('attTable');
      console.log(element)
      var ws = xlsx.utils.table_to_sheet(element);
      var wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "");
            const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
  
        this.saveAsExcelFile(excelBuffer, " Object Arribute");
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


