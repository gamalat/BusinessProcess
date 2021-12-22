import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ObjectAttribute } from 'src/app/interfaces/ObjectAttribute';
import { BusinessObjectService } from 'src/app/services/business-object.service';
import { DataObjectService } from 'src/app/services/data-object.service';
import { ObjectAttributeService } from 'src/app/services/object-attribute.service';
declare var bootbox: any;

@Component({
  selector: 'app-business-attribute',
  templateUrl: './business-attribute.component.html',
  styleUrls: ['./business-attribute.component.css']
})
export class BusinessAttributeComponent {

  popoverTitle = 'Confirm';
  popoverMessage = 'Are You Sure to delete';
  confirmClicked = false;
  cancelClicked = false;
  panelOpenState = false;
  @Input() par: any;
[x:string]:any;
  // bo_NAME=this.boc.onRowBo
  NAME: any;
  CODE: any;
  description: any;
  ID: any;
  do_ID:any;
  do_TYPE: any;
  rowData1: any = [];
  objects: ObjectAttribute[] = [];
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


  // get all attribute with object id
  getAttributeObj(Obj_id: number, selectedData: any) {
    console.log(Obj_id);
    console.log(selectedData);
    this.NAME = selectedData.bo_NAME;
    this.ID = selectedData.bo_ID;
    this.description = selectedData.description;
    this.CODE = selectedData.bo_CODE;
    this.do_TYPE =null;

 
    
    this.ObjectAttributeService.getAttributeObjForBo(Obj_id).subscribe(
      (response: any) => {
        console.log("response.body");

        console.log(response.body);
        this.rowData = response.body;
        console.log(this.rowData);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //get all do 
  getAttributeObjD(Obj_id: number, selectedData: any) {
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
      (response: void) => {
        console.log(response);
        // window.location.reload();
        // this.getBo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //edit business object 
  public onEditBusinessObj(_f: any): void {
    console.log(_f);

    if(_f.do_TYPE == null){
    console.log(_f);
    var bobj = {
      "bo_ID": _f.ID, "bo_NAME": _f.NAME, "description": _f.description,"do_CODE":_f.CODE
    }
    console.log("bobj"+bobj)
    this.boService.editBusinessObject(bobj).subscribe(
      response => {
        console.log(response.code);
        if (response.code == "2") {
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + response.body+ "</span>  </i>",
            callback: function () {
              window.location.reload();
            }
          });
        }
        else if(response.code == "-3"){
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
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
          console.log(Response.code);
          console.log(Response.body);

          console.log(Dobj);
          console.log("bo id"+_f.ID);
          if (Response.code == "2") {
            bootbox.alert({
              title: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + Response.body + "</span>  </i>",
              callback: function () {
                window.location.reload();
              }
            });
          }
          else if(Response.code == "-3"){
            bootbox.alert({
              title: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + Response.body + "</span>  </i>",
              callback: function () {
                window.location.reload();
              }
            });
          }
        });
    }
  }
  resetForm(_f:any){
   this.do_ID="";
   this.ID="";
   this.CODE="";
   this.NAME="";
   this.description="";
   this.do_TYPE="";

  }
  // public UpdateSubmit(_f:any){

  //   this.ObjectAttributeService.UpdateBo(_f).subscribe(
  //     (    Response: string)=> {
  //       console.log(Response);
  //       if(Response == "1"){
  //         bootbox.alert({
  //                 title: "<span style='font-weight: 400; font-size: 16px;'>"+"Transaction Completed Successfully"+"</span>  </i>",
  //                 message: "<span style='font-weight: 400; font-size: 16px;'>"+"Transaction Completed Successfully "+"</span>  </i>",
  //                 callback: function(){ 
  //                   window.location.reload();
  //                 }
  //             });
  //           }
  //         });
  //       }
  // public searchObjectByName(key: string): void {
  //   const results: ObjectAttribute[] = [];
  //   for (const obj of this.objects) {
  //     if (obj.att_NAME.toLowerCase().indexOf(key.toLowerCase()) !== -1)
  //       results.push(obj);
  //   }

  //   this.objects = results;

  //   if (results.length === 0 || !key)
  //     this.getAttributeObj(1680 , '');


}
function Obj_id(Obj_id: any) {
  throw new Error('Function not implemented.');
}

